<?php

namespace App\Livewire;

use Livewire\Attributes\Title;
use Livewire\Component;
use SpireUI\Support\DateRange;

#[Title('Component Demos - Spire UI')]
class ComponentDemo extends Component
{
    public ?string $appointmentTime = null;

    public ?string $meetingTime = null;

    public ?string $eventTime = null;

    public ?string $time24Hour = null;

    public ?string $timeWithSeconds = null;

    public string $selectedFruit = '';

    public array $selectedColors = [];

    public string $searchQuery = '';

    public ?string $singleDate = null;

    public array $multipleDates = [];

    public ?DateRange $dateRange = null;

    public ?DateRange $dateRangeWithPresets = null;

    public function mount(): void
    {
        $this->appointmentTime = '09:00';
        $this->meetingTime = '14:30';
        $this->dateRange = DateRange::last7Days();
        $this->dateRangeWithPresets = DateRange::thisMonth();
    }

    public function render()
    {
        return view('livewire.component-demo');
    }
}
