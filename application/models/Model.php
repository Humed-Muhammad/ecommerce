<?php

    class Model extends CI_Model {

        // load the database lib
        public function __construct(){
            $this->load->database();
        }
        //fetch all
        public function get_all_pizzas($chars, $email){
            if($chars){
                $this->db->select('*')
                         ->from('pizzas')
                         ->where('email',$email)
                         ->like('title',$chars);
                         
                $query = $this->db->get();
                return $query->result_array();
            }else{
                $this->db->select('*')
                         ->from('pizzas')
                         ->where('email',$email);
                $query = $this->db->get();
                return $query->result_array();

            }
        }
        //fetch by condition
        public function get_one_pizza($id){
            $query = $this->db->get_where('pizzas', array('id'=>$id));
            return $query->row_array();
        }

        //delete
        public function delete_one_pizza($id){
            $this->db->delete('pizzas', array('id'=>$id));
        }

        //insert to db
        public function add_pizza($data){
            $this->db->insert('pizzas',$data);
        }
        public function edit_pizza($data, $id){
            $this->db->where('id',$id)
                     ->update('pizzas',$data);
        }
    }


?>