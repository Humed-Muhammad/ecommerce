    <?php
    defined('BASEPATH') or exit('No direct script access allowed');
    require "vendor/autoload.php";
    use \Firebase\JWT\JWT;
    use Ramsey\Uuid\Uuid;

    require APPPATH . 'libraries/RestController.php';

    use chriskacerguis\RestServer\RestController;

    class EcommersController extends RestController {

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



        // product api section
        

        public function getAllCategory_get(){
            $allCategory = $this->product->get_all_category();
            $this->response([
                "status"=> TRUE,
                "message"=>$allCategory
            ],200);
        }

       

        public function home_get(){
            $this->getAllCategory_get();
        }

        public function category_post(){
            $keyword = $_POST['data'];
            $result = $this->product->get_product_by_category($keyword);

            if($result) {
                $this->response([
                    'status' =>TRUE,
                    "message" =>$result
                ], 200);
            }else{
                $this->response([
                    "status"=>FALSE,
                    "message" => "Unable to fetch resorces"
                ],203);
            }
        }


        //cart api section

        public function addCartItems_post(){
           

            $data = json_decode($_POST['data'],1);
            $result = $this->product->addCartItem($data);

            if($result){
                $this->response([
                    "status"=>TRUE,
                    "message" => $result
                ],200);
            }else{
                $this->response([
                    "status"=>FALSE,
                    "message" => "Faild To Create Cart"
                ],200);
            }
        }
        public function deleteCart_post(){
            $id = json_decode($_POST['data'],1);
            $this->product->delete_cart($id);

            $this->response([
                "status"=>TRUE,
                "message" =>"Deleted"
            ],200);
        }

        public function deleteAllCart_post(){
            $userId = $_POST['data'];
            $this->product->delete_all_cart($userId);
            $this->response([
                "status"=>TRUE,
                "message" =>"Deleted"
            ],200);
        }


        public function cartQuantity_post(){

            $data = json_decode($_POST['data'],1);
           
            $productId = $data["productId"];

            $priceResult = $this->product->productTable($productId);
            $result = $this->product->cart_quantity($data);

            $this->response([
                "status"=>TRUE,
                "message" =>$result,
                "priceResult" =>$priceResult->price
            ],200);

        }
        public function cartPrice_post(){
           
            $data = json_decode($_POST['data'],1);
            
            $result = $this->product->cart_price($data);
            $this->response([
                "status"=>TRUE,
                "message" =>$result
            ],200);
        }

        public function getAllCart_post(){
            $userId = $_POST['data'];
            $result = $this->product->getCartItems($userId);

            $this->response([
                "status"=>TRUE,
                "message" =>$result
            ], 200);
        }

        
    

        //order api section

        public function order_post(){
            $data = json_decode($_POST['data'],1);
            $result = [];
            
            foreach($data as $d){
                $uuid = Uuid::uuid4();
                $d['orderId'] = $uuid;
                array_push($result,$d);
            }

           $res = $this->product->addOrderTable($result);

            if($res){
                $this->response([
                    "status"=>TRUE,
                    "message" =>$res
                    ]
                ,200);
            }
            else{
                $this->response([
                    "status"=>FALSE,
                    "message"=>"There is an error In DB"
                ],200);
            }
        }

        

        public function checkProductQuantity_post(){
            $productIdArray = json_decode($_POST['data'],1);
            $result = $this->product->checkProductQuantity($productIdArray);

            $this->response([
                "status" =>TRUE,
                "message" =>$result
            ],200);
        }

       
    }

    