<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Message;

class MessageController extends Controller
{
    /**
     * @OA\Info(title="Laravel app API", version="1.0")
     * @OA\Server(url="http://127.0.0.1:8000/")
     *
     * @OA\Get (
     *     path="/api/messages",
     *     summary="Получение информации о событии",
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Страница пагинации",
     *         required=false,
     *         @OA\Schema(type="integer"),
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Возвращается ифно о событии под ключом item",
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property (property="success", type="boolean"),
     *                 @OA\Property (property="message", type="string", description="Сообщение в случае ошибки"),
     *                 @OA\Property (
     *                     type="array",
     *                     property="data",
     *                     description="Массив элементов",
     *                     @OA\Items(),
     *                 ),
     *             ),
     *         ),
     *     )
     * )
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
     * @OA\Post(
     *     path="/api/messages",
     *     summary="Отправка сообщения",
     *     @OA\RequestBody(
     *         description="Параметры запроса: name, email, text",
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property (property="name", type="string", description="Имя"),
     *                 @OA\Property (property="email", type="string", description="E-mail"),
     *                 @OA\Property (property="text", type="string", description="Текст сообщения"),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Возвращается объект с ключами success и id элемента",
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property (property="success", type="boolean"),
     *                 @OA\Property (property="message", type="string", description="Сообщение в случ успеха/ошибки"),
     *                 @OA\Property (property="id", type="integer", description="Id созданного сообщения"),
     *             ),
     *         ),
     *     )
     * )
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
     * @OA\Get (
     *     path="/api/messages/{id}",
     *     summary="Получение информации о сообщении",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Id сообщения",
     *         required=true,
     *         @OA\Schema(type="integer"),
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Возвращается ифно о событии сообщении",
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property (property="success", type="boolean"),
     *                 @OA\Property (property="message", type="string", description="Сообщение"),
     *                 @OA\Property (
     *                     type="object",
     *                     property="data",
     *                     description="Поля элемента",
     *                 ),
     *             ),
     *         ),
     *     )
     * )
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
