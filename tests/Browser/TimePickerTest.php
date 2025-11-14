<?php

use Livewire\Component;

class TimePickerBrowserTestComponent extends Component
{
    public $selectedTime = '';

    public function render()
    {
        return <<<'BLADE'
            <div>
                <h1>Time Picker Test</h1>
                <x-spire::timepicker
                    wire:model.live="selectedTime"
                    placeholder="Pick a time"
                />
                <div id="selected-time">{{ $selectedTime }}</div>
            </div>
        BLADE;
    }
}

beforeEach(function () {
    Route::get('/timepicker-test', TimePickerBrowserTestComponent::class);
});

test('can open time picker', function () {
    $page = visit('/timepicker-test');

    $page->assertSee('Time Picker Test')
        ->assertSee('Pick a time')
        ->assertNoJavascriptErrors();
});

test('can select time by clicking hour, minute', function () {
    $page = visit('/timepicker-test');

    $page->click('button[aria-haspopup="dialog"]')
        ->waitFor('[data-spire-timepicker-content]')
        ->assertSee('Hour')
        ->assertSee('Minute')
        ->click('[data-spire-time-hour="14"]')
        ->click('[data-spire-time-minute="30"]')
        ->waitForText('14:30', timeout: 3000)
        ->assertNoJavascriptErrors();
});

test('can select time using now button', function () {
    $page = visit('/timepicker-test');

    $page->click('button[aria-haspopup="dialog"]')
        ->waitFor('[data-spire-timepicker-content]')
        ->click('button:has-text("Now")')
        ->wait(500);

    $selectedTime = $page->evaluate('document.getElementById("selected-time").textContent');
    expect($selectedTime)->not->toBeEmpty();

    $page->assertNoJavascriptErrors();
});

test('can clear selected time', function () {
    $page = visit('/timepicker-test');

    $page->click('button[aria-haspopup="dialog"]')
        ->waitFor('[data-spire-timepicker-content]')
        ->click('[data-spire-time-hour="14"]')
        ->click('[data-spire-time-minute="30"]')
        ->waitForText('14:30', timeout: 3000)
        ->click('button[aria-haspopup="dialog"]')
        ->waitFor('[data-spire-timepicker-content]')
        ->click('button:has-text("Clear")')
        ->wait(500)
        ->assertSee('Pick a time')
        ->assertNoJavascriptErrors();
});

test('time picker closes on escape key', function () {
    $page = visit('/timepicker-test');

    $page->click('button[aria-haspopup="dialog"]')
        ->waitFor('[data-spire-timepicker-content]')
        ->assertSee('Hour')
        ->pressKey('Escape')
        ->wait(500);

    $page->assertNoJavascriptErrors();
});

test('can navigate hour column with keyboard', function () {
    $page = visit('/timepicker-test');

    $page->click('button[aria-haspopup="dialog"]')
        ->waitFor('[data-spire-timepicker-content]')
        ->click('[role="listbox"][aria-label*="Hour"]')
        ->pressKey('ArrowDown')
        ->pressKey('ArrowDown')
        ->pressKey('Enter')
        ->wait(500)
        ->assertNoJavascriptErrors();
});

test('displays time in 12-hour format', function () {
    $page = visit('/timepicker-test');

    $page->click('button[aria-haspopup="dialog"]')
        ->waitFor('[data-spire-timepicker-content]')
        ->assertSee('AM/PM')
        ->click('[data-spire-time-hour="2"]')
        ->click('[data-spire-time-minute="30"]')
        ->click('[data-spire-time-period="PM"]')
        ->wait(500);

    $buttonText = $page->evaluate('document.querySelector("button[aria-haspopup=\'dialog\']").textContent');
    expect($buttonText)->toContain('PM');

    $page->assertNoJavascriptErrors();
});

test('scrolls to selected time when opened', function () {
    $page = visit('/timepicker-test');

    $page->click('button[aria-haspopup="dialog"]')
        ->waitFor('[data-spire-timepicker-content]')
        ->click('[data-spire-time-hour="14"]')
        ->click('[data-spire-time-minute="30"]')
        ->pressKey('Escape')
        ->wait(500)
        ->click('button[aria-haspopup="dialog"]')
        ->waitFor('[data-spire-timepicker-content]')
        ->wait(300);

    $hourColumnScroll = $page->evaluate('document.querySelector("[data-spire-time-hour=\'14\']").parentElement.scrollTop');
    expect($hourColumnScroll)->toBeGreaterThan(0);

    $page->assertNoJavascriptErrors();
});
