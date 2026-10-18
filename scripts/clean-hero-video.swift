// 用法：swift scripts/clean-hero-video.swift 原视频.mp4 public/videos/personal-hero.mp4
// 去掉视频左下角烧录的小字并去除音轨（坐标按 1280x720 设定）。
import AVFoundation
import CoreVideo

// 去掉左下角烧录小字：用其正上方的同宽区域垂直镜像覆盖，边缘羽化
let rx0 = 0, rx1 = 480, ry0 = 606, ry1 = 720   // 待覆盖区域（1280x720 坐标）
let feather = 22

let src = AVURLAsset(url: URL(fileURLWithPath: CommandLine.arguments[1]))
let track = src.tracks(withMediaType: .video)[0]
let reader = try! AVAssetReader(asset: src)
let out = AVAssetReaderTrackOutput(track: track, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
reader.add(out)

let dst = URL(fileURLWithPath: CommandLine.arguments[2])
try? FileManager.default.removeItem(at: dst)
let writer = try! AVAssetWriter(outputURL: dst, fileType: .mp4)
let input = AVAssetWriterInput(mediaType: .video, outputSettings: [
  AVVideoCodecKey: AVVideoCodecType.h264,
  AVVideoWidthKey: 1280, AVVideoHeightKey: 720,
  AVVideoCompressionPropertiesKey: [
    AVVideoAverageBitRateKey: 2_400_000,
    AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
    AVVideoMaxKeyFrameIntervalKey: 24,
  ],
])
input.expectsMediaDataInRealTime = false
input.transform = track.preferredTransform
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: nil)
writer.add(input)
writer.shouldOptimizeForNetworkUse = true
reader.startReading()
writer.startWriting()
var started = false
var n = 0
while let sb = out.copyNextSampleBuffer() {
  let pts = CMSampleBufferGetPresentationTimeStamp(sb)
  if !started { writer.startSession(atSourceTime: pts); started = true }
  let pb = CMSampleBufferGetImageBuffer(sb)!
  CVPixelBufferLockBaseAddress(pb, [])
  let base = CVPixelBufferGetBaseAddress(pb)!.assumingMemoryBound(to: UInt8.self)
  let bpr = CVPixelBufferGetBytesPerRow(pb)
  for y in ry0..<ry1 {
    let k = (y - ry0) % 140; let sy = ry0 - 1 - (k < 70 ? k : 139 - k)   // 往返镜像，只取上方 70 行，避开笔刷字
    let dy = y - ry0                     // 底边贴画面边缘，只羽化上侧
    for x in rx0..<rx1 {
      let dx = rx1 - 1 - x                // 左边贴画面边缘，只羽化右侧
      let a = min(1.0, Double(min(dy, dx)) / Double(feather))
      let s = base + sy * bpr + x * 4
      let d = base + y * bpr + x * 4
      for c in 0..<3 { d[c] = UInt8(Double(s[c]) * a + Double(d[c]) * (1 - a)) }
    }
  }
  CVPixelBufferUnlockBaseAddress(pb, [])
  while !input.isReadyForMoreMediaData { usleep(2000) }
  adaptor.append(pb, withPresentationTime: pts)
  n += 1
}
input.markAsFinished()
let sem = DispatchSemaphore(value: 0)
writer.finishWriting { sem.signal() }
sem.wait()
print("frames", n, "status", writer.status.rawValue, writer.error as Any)
