<?php

namespace App\Livewire;

use Livewire\Attributes\Title;
use Livewire\Component;
use SpireUI\Support\DateRange;

#[Title('Calendar Demo - Spire UI')]
class CalendarDemo extends Component
{
    public ?string $singleDate = null;

    public array $multipleDates = [];

    public ?DateRange $dateRange = null;

    public function mount(): void
    {
        $this->dateRange = DateRange::last7Days();
    }

    public function render()
    {
        return view('livewire.calendar-demo');
    }
}
