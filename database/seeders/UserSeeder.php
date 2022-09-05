<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::query()->create([
            'name' => 'Yessica Tamara',
            'email' => 'chika@moonton.test',
            'password' => bcrypt('admin')
        ]);

        $admin->assignRole('admin');
    }
}
