<?php 
defined('BASEPATH') or exit('No direct script access allowed');
require "vendor/autoload.php";

use \Firebase\JWT\JWT;


    class TokenDecoder extends CI_Controller{
        public $secret_key;
        public $issuer_claim;
        public $audience_claim;
        public $issuedat_claim; 
        public $notbefore_claim; 
        public $expire_claim;
        public $token;

        public function __construct(){
            // jwt handleing
            $this->secret_key = "token123";
            $this->issuer_claim = "Rest API";
            $this->audience_claim = "User";
            $this->issuedat_claim = time();
            $this->notbefore_claim = time();
            $this->expire_claim = time() + 5000;
            $this->token = array(
                "iss" => $this->issuer_claim,
                "aud" => $this->audience_claim,
                "iat" => $this->issuedat_claim,
                "nbf" => $this->notbefore_claim,
                "exp" => $this->expire_claim,
                "data" => array());
        }

        public function sendToken($check){

            $this->token["data"] = array(
                "id" => $check->id,
                "email"=> $check->email,
                "name"=> $check->first_name,
                "image"=> $check->profile_image,
            );

            $jwt = JWT::encode($this->token, $this->secret_key);
                        $webToken =
                            (array(
                                "token" => $jwt,
                                "email"=> $check->email,
                                "expireAt" => $this->expire_claim
                            ));


            return $webToken;
        }
    }