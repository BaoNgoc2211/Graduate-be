import { IOrderDetail } from "../../interface/order/order-detail.interface";
import orderDetailRepository from "../../repository/order/order-detail.repository";
import ImportBatch from "../../model/medicine/import-batch.model";
import Medicine from "../../model/medicine/medicine.model";
class OrderDetailService {
  async getAllOrderDetails() {
    return await orderDetailRepository.findAll();
  }

  async getOrderDetailById(id: string) {
    return await orderDetailRepository.findById(id);
  }

  async createOrderDetail(data: any) {
    let totalAmount = 0;
    for(const item of data.medicine)
    {
      const importBatch = await ImportBatch.findById(item.price);
      console.log(item.quantity);
      console.log(item.price);
      if (!importBatch || typeof importBatch.sellingPrice !== "number") {
      throw new Error(`ImportBatch not found or importPrice invalid for id: ${item.price}`);}

      totalAmount += item.quantity * importBatch.sellingPrice;

      // const medicine = await Medicine.findById(item.code);
      // if (!medicine) {
      //   throw new Error(`Medicine not found for ID: ${item.code}`);
      // }

      // if (medicine. < item.quantity) {
      //   throw new Error(`Not enough stock for medicine ${medicine.name}`);
      // }

      // // Trừ tồn kho và cộng số lượng đã bán
      // medicine.stock -= item.quantity;
      // medicine.sold += item.quantity;
      // await medicine.save(); // lưu thay đổi
    // }
    }
    
    data.totalAmount = totalAmount
    return await orderDetailRepository.createOrderDetail(data);
  }

  async updateOrderDetail(id: string, data: Partial<IOrderDetail>) {
    return await orderDetailRepository.updateOrderDetail(id, data);
  }

  async deleteOrderDetail(id: string) {
    return await orderDetailRepository.deleteOrderDetail(id);
  }
  

  
  // async getCartDetailsByUserId(userId: string) {
  //   return await cartDetailRepository.findByUserId(userId);
  // }

  

  
}

export default new OrderDetailService();
