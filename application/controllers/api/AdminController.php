<?php
    defined('BASEPATH') or exit('No direct script access allowed');
    require "vendor/autoload.php";
    use \Firebase\JWT\JWT;
    use Ramsey\Uuid\Uuid;

    require APPPATH . 'libraries/RestController.php';

    use chriskacerguis\RestServer\RestController;

    class AdminController extends RestController {

        
        public function __construct($config = 'rest'){

            parent::__construct($config);
            // headers section
            header('Access-Control-Allow-Origin: *');
            header("Access-Control-Allow-Headers: X-API-KEY, id, Origin, Authorization, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,  maxdataserviceversion, dataserviceversion");
            header("Access-Control-Allow-Methods: GET, HEAD,POST, OPTIONS, PUT, DELETE");
            header("Content-type:*");
            
            
          
            $method = $_SERVER['REQUEST_METHOD'];
            if($method == "OPTIONS") {
                die();
            }

            // load libraries and helpers
            $this->load->helper(array('form','url'));
            $this->load->library(array('form_validation','session'));
            $this->load->model('product');
            $this->load->model('usermodel');
            $this->load->model('admin');
    }



     // admin products api

// add major categories
     public function majorCategory_post(){

        $data = json_decode($_POST['data'],1);
        
        $this->product->add_magor_category($data);

        $this->response([
            "status"=> TRUE,
            "message" =>"Created"
        ]);
    }

    public function addcategories_post() {
            		
        $name = $_POST['major'];
        $result  = $this->admin->add_major_categories($name);

        $sub_data = [
            "majorId"=>$result->id,
            "sub_name"=>$_POST['subName']
        ];

        $sub_result = $this->admin->add_sub_categories($sub_data);
        
            if($sub_result){
                $this->response([
                    "status"=> TRUE,
                    "message"=>$result
                ],200);

            }else{
                $this->response([
                    "status"=>FALSE,
                    "message" =>'Category creation faild'
                ],203);
            }

            

    }

     public function add_post(){
         $data = json_decode($_POST['data'],1);
        $getId = $this->product->get_category_id($data["category_type"]);

        $data['category_id'] = $getId->id;
       

            $result  = $this->admin->add_product($data);
        
            if($result){
                 $this->response([
                'status'=>TRUE,
                'message'=>$data
            ]);

            }else{
                $this->response('DB_Error',203);
            }

           
    }

     public function getAllProducts_get(){
        $result = $this->admin->get_all_products();
        if($result){
            $this->response($result, 200);
        }
    }

    public function deleteProduct_post(){
        $id = $_POST['data'];

        
       $result =  $this->admin->delete_products($id);
       
        if($result){
            $this->response([
                "status" =>TRUE,
                "message" =>$id
            ], 200);
        }else{
            $this->response([
                "status" =>FALSE,
                "message" =>"Unable"
            ], 200);
        }
        
    }


    //admin dashboard api
     public function getProductPrice_post(){
           $data = json_decode($_POST['data'],1);
        $result = $this->admin->getProductTotalPrice($data);

     

        $this->response([
            "status"=>TRUE,
            "message"=>$result
        ],200);
    }

    public function get_orderByType_post(){
        $data = json_decode($_POST['data'], 1);

        $result = $this->admin->getOrderByType($data);

        $this->response([
            'status' =>TRUE,
            "message" =>$result
        ],200);
    }

    // edit product
    public function editProduct_post(){
        $data = json_decode($_POST['data'],1);

        $result = $this->admin->edit_product($data);


        $this->response([
            'status' =>TRUE,
            "message"=>$result
        ],200);

    }

    // orders api
    public function getUserOrders_post(){
        $userId = $_POST['userId'];
        $result = $this->admin->getOrderTable($userId);
        if($result){
            $this->response([
                "status"=>TRUE,
                "message"=>$result
            ],200);
        }else{
            $this->response([
                "status"=>FALSE,
                "message"=>"Unable to retrive"
            ],200);
        }
    }

    public function getAllOrders_get(){
        $result = $this->admin->getAllOrdersTable();
        if($result){
            $this->response([
                "status"=>TRUE,
                "message"=>$result
            ],200);
        }else{
            $this->response([
                "status"=>FALSE,
                "message"=>"Unable to retrive"
            ],200);
        }
    }
    public function changeOrderStatus_post(){
        $data = json_decode($_POST['data'],1);
        $result = $this->admin->change_status($data);

        if($result){
            $this->response([
                'status'=>TRUE,
                "message" =>$result
            ],200);
        }
    }
}