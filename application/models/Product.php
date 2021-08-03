<?php
class Product extends CI_Model {

    // load the database lib
    public function __construct(){
        $this->load->database();
    }

    public function add_magor_category($data){
        return  $this->db->insert('category', ['image' => $data['image'],"major_category"=>$data['name']]);
        
    }

    public function get_category_id($category_type){
        $this->db->select('id')
                 ->from('category')
                 ->where('major_category',$category_type);

        $query = $this->db->get();
        return $query->row();
    }

    

    
    public function get_all_category(){
        $major = $this->db->select("*")
                          ->from('category')
                          ->get();

        $sub = $this->db->select("*")
                        ->from('sub_category')
                        ->get();

        return [$major->result_array(), $sub->result_array()];
    }
    
    

    public function get_product_by_category($keyword){
        $this->db->select("*")
                 ->from("products")
                 ->where("category_type",$keyword)
                 ->where('status',1);
        $result = $this->db->get();

        return $result->result_array();
    }

    

    public function addCartItem($data){
        $this->db->trans_start();
        $this->db->insert("cart",$data);
        $this->db->trans_complete();

        $query = $this->db->get('cart');
        return $query->num_rows();
    }

    public function getCartItems($userId){
        $this->db->select("*")
                 ->from('cart')
                 ->where("userId",$userId);
        $query = $this->db->get();

        return $query->result_array();
    }

    public function delete_cart($id){
        $this->db->trans_start();

        foreach($id as $i){

            $this->db->where("id", $i)
                     ->delete('cart');
        }

        $this->db->trans_complete();
    }
    public function delete_all_cart($userId){
        $this->db->trans_start();

        $this->db->where("userId", $userId)
                 ->delete('cart');

        $this->db->trans_complete();
    }

    public function cart_quantity($data){
       
        $this->db->select("quantity, price")
                 ->from('cart')
                 ->where("id", $data["id"])
                 ->update('cart', ["quantity"=>$data["amount"]]);
                 
        $query = $this->db->get("cart");
        

        return $query->row();
    }

    public function productTable ($id) {
        $this->db->select('price')
                 ->where("id", $id);
        $query = $this->db->get("products");
        return $query->row();
    }

    public function cart_price($data){
       
        $this->db->select("quantity, price")
                 ->from('cart')
                 ->where("id", $data["id"])
                 ->update('cart', ["price" => $data['price']+$data['priceResult']]);
                 
        $query = $this->db->get("cart");
        

        return $query->row();
    }

    public function checkProductQuantity($productIdArray){
        $array = false;
        foreach($productIdArray as $id){
            $this->db->select('title,quantity')
                     ->from('products')
                     ->where("quantity",0)
                     ->where('id',$id);
            $check = $this->db->get();
            if($check->row() != null){
                $array = [];
                array_push($array, $check->row());
            }
        }
        return $array;
        
    }

    
    public function addOrderTable ($data){
       
        $this->db->trans_start();
        foreach ($data as $d){
          
            $query = $this->db->insert('orders',$d);

            $this->db->select('quantity')
                     ->from('products')
                     ->where('id',$d['productId']);
            $query_two = $this->db->get();
            $quantity = $query_two->row();


            if($quantity->quantity !=0){
                $this->db->where('id',$d['productId'])
                         ->update("products",array('quantity'=>$quantity->quantity-$d['quantity']));
            }
        }
        $this->db->trans_complete();

        return $query;
    }
    
    

}