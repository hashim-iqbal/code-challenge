# frozen_string_literal: true

class BaseController < ApplicationController
  include ExceptionHandler
  include BaseHandler

  protected

  def index
    render json: collection
  end

  def create
    if new_resource.save
      render json: new_resource, status: :created
    else
      render json: { error:new_resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def collection
    model.all
  end

  def new_resource
    @new_resource ||= model.new(permitted_params)
  end

  def permitted_params
    params.permit
  end
end
