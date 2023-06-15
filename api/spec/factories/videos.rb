# frozen_string_literal: true

FactoryBot.define do
  factory :video do
    title { Faker::Movie.title }

    category

    trait :with_video do
      after(:build) do |video|
        video.file.attach(io: File.open('spec/fixtures/files/valid_video.mp4'), filename: 'valid_video')
      end
    end
  end
end
