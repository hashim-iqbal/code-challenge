class VideosController < BaseController
  actions :index

  def create
    if new_resource.save
      ThumbnailGeneratorJob.perform_now(new_resource.id, params[:file])

      render json: new_resource, status: :created
    else
      render json: new_resource.errors, status: :unprocessable_entity
    end
  end

  private

  def permitted_params
    params.permit(:title, :category_id, :file)
  end
end
