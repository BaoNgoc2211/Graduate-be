import { Request, Response } from "express";
import cartDetailServices from "../../service/order/cart-detail.services";

class CartDetailController {
  async create(req: Request, res: Response) {
    try {
      const result = await cartDetailServices.createCartDetail(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to create cart detail", detail: error });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const result = await cartDetailServices.getCartDetailById(req.params.id);
      if (!result) return res.status(404).json({ message: "Cart detail not found" });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart detail", detail: error });
    }
  }

  async getByUserId(req: Request, res: Response) {
    try {
      const result = await cartDetailServices.getCartDetailsByUserId(req.params.userId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user's cart detail", detail: error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await cartDetailServices.updateCartDetail(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart detail", detail: error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await cartDetailServices.deleteCartDetail(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete cart detail", detail: error });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const result = await cartDetailServices.getAllCartDetails();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch all cart details", detail: error });
    }
  }
}

export default new CartDetailController();
