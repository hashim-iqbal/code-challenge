class Video < ApplicationRecord
  belongs_to :category

  has_one_attached :file
  has_many_attached :thumbnails

  validates_presence_of :title
  validates :file, attached: true, 
                   content_type: [:mp4, :mov],
                   size: { less_than: 200.megabytes , message: 'is too large' }

  validates :thumbnails, content_type: [:png, :jpg, :jpeg]
end
