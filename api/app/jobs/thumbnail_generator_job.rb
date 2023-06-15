# frozen_string_literal: true
class ThumbnailGeneratorJob < ApplicationJob
  queue_as :default

  attr_reader :file

  def perform(id, file)
    @file = file
    video = Video.find(id)

    ['64x64', '128x128', '256x256'].each do |res|
      video.thumbnails.attach(io: File.open(thumbnail(res).path),
                            filename: "#{video.title}_#{res}.jpg")

      tempfile.close
      tempfile.unlink
    end
  end

  private

  def thumbnail(resolution)
    movie.screenshot(tempfile.path, seek_time: 5, resolution:)
  end

  def tempfile
    Tempfile.new(['image', '.jpg'])
  end

  def movie
    @movie ||= FFMPEG::Movie.new file.path
  end
end
