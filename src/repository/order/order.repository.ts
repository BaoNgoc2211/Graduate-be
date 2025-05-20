import Order from "../../model/order/order";
import { IOrder } from "../../interface/order/order.interface";
import OrderDetail from "../../model/order/order.detail.model";

class OrderDetailRepository{
    async findAll(){
        return await Order.find()
        .populate({
            path: 'user_Id',
            model: 'User',
            select: 'info.name' // <-- Thêm email vào đây
        })
        .populate({
        path: "orderDetail",
        populate: [
          {
            path: "medicine.code",
            model: "Medicine",
            select: "code name thumbnail",
          },
          {
            path: "medicine.price",
            model: "ImportBatch",
            select: "sellingPrice medicine_id",
          },
        ],
      });
    }

    async findById(id: string){
        const order = await Order.findById(id)
        .populate({
            path: 'user_Id',
            model: 'User',
            select: 'name '
        })
        .populate({
        path: "orderDetail",
        populate: [
          {
            path: "medicine.code",
            model: "Medicine",
            select: "code name thumbnail",
          },
          {
            path: "medicine.price",
            model: "ImportBatch",
            select: "sellingPrice medicine_id",
          },
        ],
      });
        return order;
    }

    async createOrder(data: IOrder){
        const order=  await Order.create(data);
        return order;
    }
    
    async updateOrder(id:string, data:Partial<IOrder>){
        const order =  await Order.findByIdAndUpdate(id,data,{new:true});
        return order;
    }
    async deleteOrder(id: string) {
        const order =  await Order.findByIdAndDelete(id);
        return order;
    }

        
}
export default new OrderDetailRepository