<?php
    defined('BASEPATH') or exit('No direct script access allowed');
    require "vendor/autoload.php";
    
    use Ramsey\Uuid\Uuid;
    require APPPATH . 'libraries/RestController.php';
    require APPPATH . 'libraries/TokenDecoder.php';

    use chriskacerguis\RestServer\RestController;

    class UserController extends RestController {
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

            $this->load->config('formValidation');
            $this->load->config('upload');


            

    }


     // user api section

            //...signup //
            public function signup_post(){
            

                $signup_rules = $this->config->item('signup_rules');
    
                $this->form_validation->set_rules($signup_rules);
    
                if($this->form_validation->run()){
                    $userData = [
                    "id" => $_POST['id'],
                    "first_name" =>$_POST["firstname"],
                    "last_name" =>$_POST["lastname"],
                    "password" =>password_hash($_POST["password"], PASSWORD_BCRYPT),
                    "email" =>$_POST["email"],
                    "phone_number" =>$_POST["phone"],
                    "country" =>$_POST["country"],
                    "birth_date" =>$_POST["birthDate"],
                ];
                    $result = $this->usermodel->addUser($userData);
                    if($result){
                        $this->response([
                            "status"=> TRUE,
                            "message" =>$userData
                        ],200);
                    }
                    else{
                        $this->response([
                            "status" => FALSE,
                            "message" => "DB_Error!"
                        ],203);
                    }
                }else{
                    $formError = [
                        "firstname"=> strip_tags( form_error('firstname')),
                        "lastname"=> strip_tags(form_error('lastname')),
                        "email"=> strip_tags(form_error('email')),
                        "password"=> strip_tags(form_error('password')),
                        "phone"=> strip_tags(form_error('phone')),
                        "country"=> strip_tags(form_error('country')),
                        "birthDate"=> strip_tags(form_error('birthDate')),
                    ];
    
                    $this->response([
                        "status"=> FALSE,
                        "message" => $formError
                    ],203);
                }
            }
    
    
             //...login //
            public function login_post(){
                $login_rules = $this->config->item('login_rules');
                
    
                $this->form_validation->set_rules($login_rules);
                if($this->form_validation->run()){
    
                    $email = $_POST['email'];
                    $password =$_POST['password'];
    
                    $check = $this->usermodel->check_user($email);
    
                    if(boolval($check)==FALSE){
                        $autho = FALSE;
    
                    }else{
                        $autho = password_verify($password,$check->password);
                    }
                    if($autho){
                       
                        $Decoder = new TokenDecoder();
    
                    $this->response([
                        "status"=>TRUE,
                        "message"=>$Decoder->sendToken($check)
                    ], 200);
                    }else{
                        $this->response([
                            "status"=>FALSE,
                            "message"=>"Password or email don't match"
                        ], 203);
                    }
    
                
                    
                }else{
                    $formError = [
                        "email"=> strip_tags(form_error('email')),
                        "password"=> strip_tags(form_error('password')),
                    ];
                    $this->response([
                        "status"=> FALSE,
                        "message"=>$formError
                    ],203);
                }
            }
    
    
            // autonticating already logged in user
            public function passUser_post(){
                $email = $_POST['data'];
                $check = $this->usermodel->getAuthoUser($email);
                
                $Decoder = new TokenDecoder();
    
                    $this->response([
                        "status"=>TRUE,
                        "message"=>$Decoder->sendToken($check)
                    ], 200);
            }
    
            public function changeProfile_post(){
                $data = json_decode($_POST['data'],1);
                
    
                $result = $this->usermodel->change_profile($data);
                if($result){
                    $this->response([
                        "status"=>TRUE,
                        "message"=>"Changed"
                    ],200);
                }
            }
}