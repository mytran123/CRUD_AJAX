<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->only('email','password');
        if (Auth::attempt($data)) {
            return response()->json(['success'=>true]);
        } else {
            dd('Login Fail');
        }
    }

    public function logout()
    {
        Session::flush();
        Auth::logout();
        return response()->json(['success'=>true]);
    }
}
