<?php

namespace App\Livewire;

use Livewire\Attributes\Computed;
use Livewire\Component;

class DropdownTest extends Component
{
    public $selectedFruit = 'apple';

    public $selectedCountry = '';

    public $successMessage = '';

    #[Computed]
    public function availableCountries()
    {
        return match ($this->selectedFruit) {
            'apple' => ['us' => 'United States', 'ca' => 'Canada'],
            'banana' => ['ec' => 'Ecuador', 'ph' => 'Philippines'],
            'cherry' => ['tr' => 'Turkey', 'us' => 'United States'],
            'date' => ['sa' => 'Saudi Arabia', 'eg' => 'Egypt'],
            'elderberry' => ['de' => 'Germany', 'uk' => 'United Kingdom'],
            default => [],
        };
    }

    public function updatedSelectedFruit()
    {
        $this->selectedCountry = '';
    }

    public function resetSelections()
    {
        $this->selectedFruit = '';
        $this->selectedCountry = '';
        $this->successMessage = '';
    }

    public function save()
    {
        $this->successMessage = sprintf(
            'Form saved successfully! Fruit: %s, Country: %s',
            $this->selectedFruit ?: 'None',
            $this->selectedCountry ?: 'None'
        );
    }

    public function render()
    {
        return view('livewire.dropdown-test');
    }
}
