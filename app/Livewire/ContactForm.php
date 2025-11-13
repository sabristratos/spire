<?php

namespace App\Livewire;

use Livewire\Attributes\Validate;
use Livewire\Component;

class ContactForm extends Component
{
    #[Validate('required|min:3')]
    public string $name = '';

    #[Validate('required|email')]
    public string $email = '';

    #[Validate('required|min:8')]
    public string $password = '';

    #[Validate('nullable|min:10')]
    public string $message = '';

    public string $apiToken = 'pk_test_abc123xyz789def456ghi012jkl345mno678pqr901stu234vwx567yz';

    public string $search = '';

    public bool $submitted = false;

    public function submit()
    {
        $this->validate();

        $this->submitted = true;

        session()->flash('success', 'Form submitted successfully!');
    }

    public function resetForm()
    {
        $this->reset(['name', 'email', 'password', 'message', 'submitted']);
        $this->resetValidation();
    }

    public function render()
    {
        return view('livewire.contact-form');
    }
}
