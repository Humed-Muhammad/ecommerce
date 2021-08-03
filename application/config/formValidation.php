<?php

$config['pizza_add'] = array(
        array(
            'field'=>'title',
            'label'=>'Title',
            'rules' => "required|min_length[5]|trim|htmlspecialchars|regex_match[/^[a-zA-Z\s]+$/]",
            'errors' => array(
                'required'=>'Title can not be empty!',
                'regex_match'=>'Title must only have letters and spaces!'
            )
            ),
            array(
                'field'=>'ingredients',
                'label'=>'Ingredients',
                'rules'=>'required|htmlspecialchars|regex_match[/^([a-zA-Z\s]+)(,\s*[a-zA-Z\s]*)*$/]',
                'errors' => array(
                    'required' => 'Ingredients can not be empty',
                    'regex_match'=>'Only space and letters are allowed, (Must be Comma Separeted)'
                )
            )
    );


    $config['signup_rules'] = [
        array(
            'field'=>'firstname',
            'label'=>'First Name',
            'rules'=>'required',
            'errors'=>[
                'required'=>'First Name can\'t be empty!',
            ]
        ),
        array(
            'field'=>'lastname',
            'label'=>'Last Name',
            'rules'=>'required',
            'errors'=>[
                'required'=>'Last Name can\'t be empty!',
            ]
        ),
        array(
            'field'=>'password',
            'label'=>'Password',
            'rules'=>'required|min_length[3]',
            'errors'=>[
                'required'=>'Password can\'t be empty',
                'min_length'=>'Password length must be 3 char or above!'
            ]
        ),
        
        array(
            'field'=>'email',
            'label'=>'Email',
            'rules'=>'required|valid_email|is_unique[users.email]',
            'errors'=>[
                'required'=>'Email can\'t be empty',
                'is_unique'=>"Email already exists"
            ]
        ),
        array(
            'field'=>'phone',
            'label'=>'Phone',
            'rules'=>'required',
            'errors'=>[
                'required'=>'Phone can\'t be empty',
            ]
        ),
        array(
            'field'=>'country',
            'label'=>'Country',
            'rules'=>'required',
            'errors'=>[
                'required'=>'Country can\'t be empty',
            ]
        ),
        array(
            'field'=>'birthDate',
            'label'=>'Birth Date',
            'rules'=>'required',
            'errors'=>[
                'required'=>'Birth Date can\'t be empty',
            ]
        ),
    ];


    $config['login_rules'] = array(
        array(
            'field'=>'password',
            'label'=>'Password',
            'rules'=>'required',
            'errors'=>[
                'required'=>'Password can\'t be empty',
            ]
        ),
        array(
            'field'=>'email',
            'label'=>'Email',
            'rules'=>'required|valid_email',
            'errors'=>[
                'required'=>'Email can\'t be empty',
            ]
        ),
    );