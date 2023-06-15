require 'rails_helper'

RSpec.describe Category, type: :model do
  describe 'Association' do
    it { should have_many(:videos) }
  end

  describe 'Validation' do
    it { should validate_presence_of(:name) }
    it { should validate_inclusion_of(:name).in_array(Category::NAMES) }
  end
end
