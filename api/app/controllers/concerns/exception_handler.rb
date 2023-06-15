# frozen_string_literal: true

module ExceptionHandler
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound do |e|
      render json: { error: e.message }, status: :not_found
    end

    rescue_from ActiveRecord::RecordNotUnique do |_e|
      render json: { error: e.message }, status: :unprocessable_entity
    end

    rescue_from ActionController::ParameterMissing do |e|
      missing_params = e.message.gsub(/\n/, '').split('Did').first

      render json: { error: missing_params }, status: :unprocessable_entity
    end
  end
end
