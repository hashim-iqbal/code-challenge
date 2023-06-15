# frozen_string_literal: true

class Category < ApplicationRecord
  NAMES = ['Exercise', 'Education', 'Recipe'].freeze

  validates :name, inclusion: {  in: NAMES }, presence: true

  has_many :videos
end
