<?php

use Livewire\Component;
use Livewire\Livewire;

class TimePickerTestComponent extends Component
{
    public $appointmentTime = '';

    public function render()
    {
        return <<<'BLADE'
            <div>
                <x-spire::timepicker wire:model="appointmentTime" />
            </div>
        BLADE;
    }
}

test('timepicker can be rendered with livewire', function () {
    Livewire::test(TimePickerTestComponent::class)
        ->assertSet('appointmentTime', '')
        ->assertSee('Select time')
        ->assertStatus(200);
});

test('timepicker updates livewire property', function () {
    Livewire::test(TimePickerTestComponent::class)
        ->assertSet('appointmentTime', '')
        ->set('appointmentTime', '14:30')
        ->assertSet('appointmentTime', '14:30');
});

test('timepicker renders with initial value', function () {
    $component = Livewire::test(TimePickerTestComponent::class);
    $component->set('appointmentTime', '09:15');

    $component->assertSet('appointmentTime', '09:15');
});

test('timepicker clears value', function () {
    Livewire::test(TimePickerTestComponent::class)
        ->set('appointmentTime', '14:30')
        ->assertSet('appointmentTime', '14:30')
        ->set('appointmentTime', '')
        ->assertSet('appointmentTime', '');
});

test('timepicker handles time with seconds', function () {
    Livewire::test(TimePickerTestComponent::class)
        ->set('appointmentTime', '14:30:45')
        ->assertSet('appointmentTime', '14:30:45');
});

test('timepicker handles midnight correctly', function () {
    Livewire::test(TimePickerTestComponent::class)
        ->set('appointmentTime', '00:00')
        ->assertSet('appointmentTime', '00:00');
});

test('timepicker handles noon correctly', function () {
    Livewire::test(TimePickerTestComponent::class)
        ->set('appointmentTime', '12:00')
        ->assertSet('appointmentTime', '12:00');
});
