<?php
    class UserModel extends CI_Model {

        public function __construct(){
            parent::__construct();

            $this->load->database();
        }

        public function addUser($userData){
            $this->db->trans_start();
            $query = $this->db->insert('users',$userData);
            $this->db->trans_complete();
            return $query;
        }

        public function check_user($email){

            $this->db->select('*')
                     ->from('users')
                     ->where('email',$email);
                     
                     
            $result = $this->db->get();
            return $result->row();
        }

        public function getAuthoUser ($email){
            $this->db->select('*')
                     ->from('users')
                     ->where('email',$email);
                     

            $result = $this->db->get();
            return $result->row();
        }
        public function get_user_cart ($userId){
            $this->db->select('*')
                     ->from('cart')
                     ->where('userId', $userId);
            $query = $this->db->get();

            return $query->num_rows();
        }

        public function change_profile ($data){
            $this->db->select('*')
                     ->from('users')
                     ->where('id', $data['id'])
                     ->update('users', ['profile_image'=>$data['image']]);
            $query = $this->db->get('users');

            return $query->result();
        }

        
    }