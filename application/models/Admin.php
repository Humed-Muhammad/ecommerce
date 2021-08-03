<?php
    class Admin extends CI_Model{
        public function __construct(){
            $this->load->database();
        }

        public function getProductTotalPrice($data){
            $this->db->select('major_category')
                     ->from('category')
                     ->select_sum('price')
                     ->select('category_id,created_at')
                     ->where('status',2)
                     ->where('created_at >=',$data['startDate'])
                     ->where('created_at <=',$data['endDate'])
                     ->join("orders","category.id = orders.category_id")
                     ->group_by('category_id');
                  
            $query = $this->db->get();

            return $query->result();
        }


        // orders
        public function getOrderTable($userId){
            $this->db->select('*')
                     ->from('orders')
                     ->where('userId', $userId);
            $query = $this->db->get();
    
            return $query->result_array();
        }
    
        public function getAllOrdersTable(){
            $this->db->select('*')
                     ->from('orders')
                     ->select('first_name, last_name')
                     ->join('users',"users.id = orders.userId");
                     
            $query = $this->db->get();
    
            return $query->result_array();
        }
        public function getOrderByType($data){
            $array = [];
            foreach($data as $d){
                
                $this->db->from('orders')
                         ->where('category_id',$d)
                         ->where('status',2);
                         
                        
                $query = $this->db->count_all_results();
                array_push($array,$query);
                
            }
            return $array;
        }

        // product handlers
        public function add_product($data){
            return  $this->db->insert("products",$data);
        }

        public function edit_product($data){
            $this->db->where('id', $data['id'])
                     ->update('products', $data);

            $query = $this->db->get('products');

            return $query->result();
        }

        public function get_all_products(){
            $this->db->select("*")
                     ->from('products')
                     ->where('status',1);
            $result = $this->db->get();
    
            return $result->result_array();
        }

        public function delete_products($id){
            return $this->db->where('id', $id)
                              ->update("products",array("status"=>0));
            
           
        }

        //category handlers

        public function add_major_categories($name){
            $this->db->select('*')
                     ->from("category")
                     ->where("major_category",$name);
        
            $query = $this->db->get();
            return $query->row();
    
    
        }

        public function add_sub_categories($sub_data){
   
            return $this->db->insert("sub_category", $sub_data);
           
     
         }

         public function change_status($data){
            $this->db->select('*')
                     ->from('orders')
                     ->where('orderId', $data['orderId'])
                     ->update("orders",array("status"=>$data['status']));

            $query = $this->db->get("orders");
            return $query->result();
         }
    }