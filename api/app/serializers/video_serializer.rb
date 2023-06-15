class VideoSerializer < ActiveModel::Serializer
  attributes :id, :title, :thumbnail, :file, :file_type

  belongs_to :category

  def thumbnail
    object.thumbnails.find do |t|
      t.metadata['width'] == 256 && t.metadata['height'] == 256
    end&.url
  end

  def file
    object.file&.url
  end

  def file_type
    object.file&.blob&.content_type
  end
end
