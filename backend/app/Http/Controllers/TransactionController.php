<?php

namespace App\Http\Controllers;

use App\Models\Transaction;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $list = Transaction::all();



        return $list;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $transaction = new Transaction;
        $transaction->value = $request->input('value');
        $transaction->name = $request->input('name');
        $transaction->cpf = $request->input('cpf');
        $transaction->status = $request->input('status');
        $transaction->image = $request->input('image');
        $transaction->time = $request->input('time');
        $transaction->date = $request->input('date');

        $transaction->save();

        return $transaction;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Transaction::find($id);

        if ($data) {
            return $data;
        }
        return false;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = Transaction::find($id);

        if ($data) {
            return $data;
        }
        return false;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = Transaction::find($id);
        if ($request->value) {
            $data->value = $request->input('value');
        }
        $data->cpf = $request->input('cpf');
        if ($request->status) {
            $data->status = $request->input('status');
        }
        $data->image = $request->input('image');
        if ($request->time) {
            $data->time = $request->input('time');
        }
        if ($request->date) {
            $data->date = $request->input('date');
        }

        $data->save();

        return $data;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $find = Transaction::find($id);
        if ($find) {
            $find->delete();
            return true;
        }
        return false;
    }
}
