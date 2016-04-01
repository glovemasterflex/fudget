class BillsController < ApplicationController
  def index
    @bills = Bill.all 
  end

  def show
  end

  def edit
  end 

  def destroy
  end 

end
