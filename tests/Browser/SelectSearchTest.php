<?php

it('shows search input when searchable prop is true', function () {
    $page = visit('/');

    $page->assertSee('Searchable Select')
        ->click('button[aria-haspopup="listbox"]')
        ->assertSee('Search options...')
        ->assertNoJavascriptErrors();
});

it('filters options when typing in search input', function () {
    $page = visit('/');

    $page->click('button[aria-haspopup="listbox"]')
        ->assertSee('United States')
        ->assertSee('Canada')
        ->assertSee('United Kingdom')
        ->type('input[type="text"]', 'United')
        ->assertSee('United States')
        ->assertSee('United Kingdom')
        ->assertDontSee('Canada')
        ->assertDontSee('France')
        ->assertNoJavascriptErrors();
});

it('shows no results message when search returns no matches', function () {
    $page = visit('/');

    $page->click('button[aria-haspopup="listbox"]')
        ->type('input[type="text"]', 'xyz123notfound')
        ->assertSee('No results found')
        ->assertDontSee('United States')
        ->assertNoJavascriptErrors();
});

it('clears search with clear button', function () {
    $page = visit('/');

    $page->click('button[aria-haspopup="listbox"]')
        ->type('input[type="text"]', 'United')
        ->assertSee('United States')
        ->assertDontSee('Canada')
        ->click('button[aria-label="Clear"]')
        ->assertSee('Canada')
        ->assertSee('France')
        ->assertNoJavascriptErrors();
});

it('selects highlighted option with enter key', function () {
    $page = visit('/');

    $page->click('button[aria-haspopup="listbox"]')
        ->type('input[type="text"]', 'Canada')
        ->pressKey('ArrowDown')
        ->pressKey('Enter')
        ->assertSee('Canada')
        ->assertNoJavascriptErrors();
});

it('navigates filtered options with arrow keys', function () {
    $page = visit('/');

    $page->click('button[aria-haspopup="listbox"]')
        ->type('input[type="text"]', 'United')
        ->pressKey('ArrowDown')
        ->pressKey('ArrowDown')
        ->pressKey('Enter')
        ->assertSee('United Kingdom')
        ->assertNoJavascriptErrors();
});

it('resets search when dropdown closes', function () {
    $page = visit('/');

    $page->click('button[aria-haspopup="listbox"]')
        ->type('input[type="text"]', 'United')
        ->assertSee('United States')
        ->assertDontSee('Canada')
        ->pressKey('Escape')
        ->click('button[aria-haspopup="listbox"]')
        ->assertSee('Canada')
        ->assertSee('France')
        ->assertNoJavascriptErrors();
});

it('auto-focuses search input when dropdown opens', function () {
    $page = visit('/');

    $page->click('button[aria-haspopup="listbox"]')
        ->wait(100)
        ->assertNoJavascriptErrors();

    $activeElement = $page->evaluate('document.activeElement.getAttribute("type")');
    expect($activeElement)->toBe('text');
});

it('closes dropdown with escape when search is empty', function () {
    $page = visit('/');

    $page->click('button[aria-haspopup="listbox"]')
        ->assertSee('Search options...')
        ->pressKey('Escape')
        ->assertDontSee('Search options...')
        ->assertNoJavascriptErrors();
});

it('clears search first, then closes dropdown on second escape', function () {
    $page = visit('/');

    $page->click('button[aria-haspopup="listbox"]')
        ->type('input[type="text"]', 'United')
        ->pressKey('Escape')
        ->assertSee('Search options...')
        ->pressKey('Escape')
        ->assertDontSee('Search options...')
        ->assertNoJavascriptErrors();
});
