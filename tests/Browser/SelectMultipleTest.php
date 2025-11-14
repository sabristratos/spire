<?php

beforeEach(function () {
    config(['app.locale' => 'en']);
});

it('displays multiselect select with no initial selection', function () {
    $page = visit('/select-multiple-test');

    $page->assertSee('Select fruits')
        ->assertNoJavascriptErrors();
});

it('can select multiple options by clicking', function () {
    $page = visit('/select-multiple-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->assertSee('Apple')
        ->assertSee('Banana')
        ->assertSee('Cherry')
        ->click('[role="option"]:has-text("Apple")')
        ->assertSee('1 items selected')
        ->click('[role="option"]:has-text("Banana")')
        ->assertSee('2 items selected')
        ->assertNoJavascriptErrors();
});

it('shows selected items as tags in trigger', function () {
    $page = visit('/select-multiple-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->click('[role="option"]:has-text("Apple")')
        ->click('[role="option"]:has-text("Banana")')
        ->waitFor('[data-spire-select-tag]')
        ->assertSee('Apple')
        ->assertSee('Banana')
        ->assertNoJavascriptErrors();
});

it('can remove selected item by clicking tag remove button', function () {
    $page = visit('/select-multiple-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->click('[role="option"]:has-text("Apple")')
        ->click('[role="option"]:has-text("Banana")')
        ->waitFor('[data-spire-select-tag]')
        ->click('[data-spire-select-tag]:has-text("Apple") button')
        ->assertDontSee('Apple')
        ->assertSee('Banana')
        ->assertNoJavascriptErrors();
});

it('toggles option selection on click', function () {
    $page = visit('/select-multiple-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->click('[role="option"]:has-text("Apple")')
        ->assertSee('1 items selected')
        ->click('[role="option"]:has-text("Apple")')
        ->assertSee('Select fruits')
        ->assertNoJavascriptErrors();
});

it('dropdown stays open after selecting an option', function () {
    $page = visit('/select-multiple-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->assertSee('Apple')
        ->click('[role="option"]:has-text("Apple")')
        ->assertSee('Banana')
        ->assertSee('Cherry')
        ->assertNoJavascriptErrors();
});

it('can select all options with select all button', function () {
    $page = visit('/select-multiple-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->click('button:has-text("Select All")')
        ->assertSee('Apple')
        ->assertSee('Banana')
        ->assertSee('Cherry')
        ->assertNoJavascriptErrors();
});

it('can clear all selections with clear all button', function () {
    $page = visit('/select-multiple-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->click('[role="option"]:has-text("Apple")')
        ->click('[role="option"]:has-text("Banana")')
        ->assertSee('2 items selected')
        ->click('button:has-text("Clear All")')
        ->assertSee('Select fruits')
        ->assertNoJavascriptErrors();
});

it('disables select all button when all options are selected', function () {
    $page = visit('/select-multiple-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->click('button:has-text("Select All")')
        ->assertAttributeContains('button:has-text("Select All")', 'disabled', 'true')
        ->assertNoJavascriptErrors();
});

it('disables clear all button when no options are selected', function () {
    $page = visit('/select-multiple-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->assertAttributeContains('button:has-text("Clear All")', 'disabled', 'true')
        ->assertNoJavascriptErrors();
});

it('shows selection count in header', function () {
    $page = visit('/select-multiple-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->assertSee('0 / 5 selected')
        ->click('[role="option"]:has-text("Apple")')
        ->assertSee('1 / 5 selected')
        ->click('[role="option"]:has-text("Banana")')
        ->assertSee('2 / 5 selected')
        ->assertNoJavascriptErrors();
});

it('toggles selection with enter key', function () {
    $page = visit('/select-multiple-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->press('ArrowDown')
        ->press('Enter')
        ->assertSee('1 items selected')
        ->press('Enter')
        ->assertSee('Select fruits')
        ->assertNoJavascriptErrors();
});

it('closes dropdown with escape key', function () {
    $page = visit('/select-multiple-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->assertSee('Apple')
        ->press('Escape')
        ->assertDontSee('Apple')
        ->assertNoJavascriptErrors();
});

it('navigates options with arrow keys', function () {
    $page = visit('/select-multiple-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->press('ArrowDown')
        ->press('ArrowDown')
        ->press('Enter')
        ->assertSee('1 items selected')
        ->assertNoJavascriptErrors();
});

it('respects max selection limit', function () {
    $page = visit('/select-multiple-with-max-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->click('[role="option"]:has-text("Apple")')
        ->click('[role="option"]:has-text("Banana")')
        ->click('[role="option"]:has-text("Cherry")')
        ->assertSee('3 items selected')
        ->assertNoJavascriptErrors();
});

it('disables unselected options when max limit reached', function () {
    $page = visit('/select-multiple-with-max-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->click('[role="option"]:has-text("Apple")')
        ->click('[role="option"]:has-text("Banana")')
        ->click('[role="option"]:has-text("Cherry")')
        ->assertAttributeContains('[role="option"]:has-text("Orange")', 'aria-disabled', 'true')
        ->assertNoJavascriptErrors();
});

it('shows more items badge when selections exceed display limit', function () {
    $page = visit('/select-multiple-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->click('[role="option"]:has-text("Apple")')
        ->click('[role="option"]:has-text("Banana")')
        ->click('[role="option"]:has-text("Cherry")')
        ->click('button[aria-haspopup="listbox"]')
        ->assertSee('+ 1 more')
        ->assertNoJavascriptErrors();
});

it('works with searchable multiselect', function () {
    $page = visit('/select-multiple-searchable-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->type('input[type="text"]', 'app')
        ->click('[role="option"]:has-text("Apple")')
        ->assertSee('1 items selected')
        ->assertNoJavascriptErrors();
});

it('shows checkmarks on selected options', function () {
    $page = visit('/select-multiple-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->click('[role="option"]:has-text("Apple")')
        ->assertVisible('[role="option"]:has-text("Apple") svg')
        ->assertNoJavascriptErrors();
});

it('syncs with livewire wire:model', function () {
    $page = visit('/select-multiple-livewire-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->click('[role="option"]:has-text("Apple")')
        ->click('[role="option"]:has-text("Banana")')
        ->waitForText('Selected: Apple, Banana')
        ->assertSee('Selected: Apple, Banana')
        ->assertNoJavascriptErrors();
});

it('maintains selections when dropdown reopens', function () {
    $page = visit('/select-multiple-test');

    $page->click('button[aria-haspopup="listbox"]')
        ->click('[role="option"]:has-text("Apple")')
        ->click('[role="option"]:has-text("Banana")')
        ->press('Escape')
        ->click('button[aria-haspopup="listbox"]')
        ->assertAttributeContains('[role="option"]:has-text("Apple")', 'aria-selected', 'true')
        ->assertAttributeContains('[role="option"]:has-text("Banana")', 'aria-selected', 'true')
        ->assertNoJavascriptErrors();
});
