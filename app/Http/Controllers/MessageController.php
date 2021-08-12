<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Message;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $data = Message::select('id', 'name', 'email')
                ->orderBy('created_at', 'desc')
                ->paginate(10);
            return response()
                ->json([
                    'success' => true,
                    'message' => 'OK',
                    'data' => $data
                ]);
        } catch (\Exception $exception) {
            return response()
                ->json([
                    'success' => false,
                    'message' => $exception->getMessage(),
                ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required',
            ]);
            $message = Message::create($request->all());
            return response()
                ->json([
                    'success' => true,
                    'message' => 'OK',
                    'id' => $message->id
                ]);
        } catch (\Exception $exception) {
            return response()
                ->json([
                    'success' => false,
                    'message' => $exception->getMessage(),
                ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request, $id)
    {
        try {
            $select = '*';
            if ($request->fields) {
                $select = array_map('trim', explode(',', $request->fields));
            }
            $data = Message::select($select)->find($id);
            if ($data) {
                return response()
                    ->json([
                        'success' => true,
                        'message' => 'OK',
                        'data' => $data
                    ]);
            }
            return response()
                ->json([
                    'success' => false,
                    'message' => 'No such element',
                ]);
        } catch (\Exception $exception) {
            return response()
                ->json([
                    'success' => false,
                    'message' => $exception->getMessage(),
                ]);
        }
    }
}
