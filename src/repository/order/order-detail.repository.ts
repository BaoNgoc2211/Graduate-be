// import Order from "../../model/order/order";
import { IOrderDetail } from "../../interface/order/order-detail.interface";
import OrderDetail from "../../model/order/order.detail.model";

class OrderDetailRepository{
    async findAll(){
        return await OrderDetail.find();
    }

    async findById(id: string){
        const orderDetail = await OrderDetail.findById(id)
        .populate({
            path: 'medicine.stock',
            model: 'Medicine',
            select: 'code name thumbnail'
        });
        return orderDetail;
    }

    async createOrderDetail(orderdetail: IOrderDetail){
        const orderDetail =  await OrderDetail.create(orderdetail);
        return orderDetail;
    }
    
    async updateOrderDetail(id:string, data:Partial<IOrderDetail>){
        const orderDetail =  await OrderDetail.findByIdAndUpdate(id,data,{new:true});
        return orderDetail;
    }
    async deleteOrderDetail(id: string) {
        const orderDetail =  await OrderDetail.findByIdAndDelete(id);
        return orderDetail;
    }

        
}
export default new OrderDetailRepository