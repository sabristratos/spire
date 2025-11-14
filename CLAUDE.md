<laravel-boost-guidelines>
=== foundation rules ===

# Laravel Boost Guidelines

The Laravel Boost guidelines are specifically curated by Laravel maintainers for this application. These guidelines should be followed closely to enhance the user's satisfaction building Laravel applications.

## Foundational Context
This application is a Laravel application and its main Laravel ecosystems package & versions are below. You are an expert with them all. Ensure you abide by these specific packages & versions.

- php - 8.3.20
- laravel/framework (LARAVEL) - v12
- laravel/prompts (PROMPTS) - v0
- livewire/livewire (LIVEWIRE) - v3
- laravel/mcp (MCP) - v0
- laravel/pint (PINT) - v1
- laravel/sail (SAIL) - v1
- pestphp/pest (PEST) - v4
- phpunit/phpunit (PHPUNIT) - v12
- tailwindcss (TAILWINDCSS) - v4

## Conventions
- You must follow all existing code conventions used in this application. When creating or editing a file, check sibling files for the correct structure, approach, naming.
- Use descriptive names for variables and methods. For example, `isRegisteredForDiscounts`, not `discount()`.
- Check for existing components to reuse before writing a new one.

## Verification Scripts
- Do not create verification scripts or tinker when tests cover that functionality and prove it works. Unit and feature tests are more important.

## Application Structure & Architecture
- Stick to existing directory structure - don't create new base folders without approval.
- Do not change the application's dependencies without approval.

## Frontend Bundling
- If the user doesn't see a frontend change reflected in the UI, it could mean they need to run `npm run build`, `npm run dev`, or `composer run dev`. Ask them.

## Replies
- Be concise in your explanations - focus on what's important rather than explaining obvious details.

## Documentation Files
- You must only create documentation files if explicitly requested by the user.


=== boost rules ===

## Laravel Boost
- Laravel Boost is an MCP server that comes with powerful tools designed specifically for this application. Use them.

## Artisan
- Use the `list-artisan-commands` tool when you need to call an Artisan command to double check the available parameters.

## URLs
- Whenever you share a project URL with the user you should use the `get-absolute-url` tool to ensure you're using the correct scheme, domain / IP, and port.

## Tinker / Debugging
- You should use the `tinker` tool when you need to execute PHP to debug code or query Eloquent models directly.
- Use the `database-query` tool when you only need to read from the database.

## Reading Browser Logs With the `browser-logs` Tool
- You can read browser logs, errors, and exceptions using the `browser-logs` tool from Boost.
- Only recent browser logs will be useful - ignore old logs.

## Searching Documentation (Critically Important)
- Boost comes with a powerful `search-docs` tool you should use before any other approaches. This tool automatically passes a list of installed packages and their versions to the remote Boost API, so it returns only version-specific documentation specific for the user's circumstance. You should pass an array of packages to filter on if you know you need docs for particular packages.
- The 'search-docs' tool is perfect for all Laravel related packages, including Laravel, Inertia, Livewire, Filament, Tailwind, Pest, Nova, Nightwatch, etc.
- You must use this tool to search for Laravel-ecosystem documentation before falling back to other approaches.
- Search the documentation before making code changes to ensure we are taking the correct approach.
- Use multiple, broad, simple, topic based queries to start. For example: `['rate limiting', 'routing rate limiting', 'routing']`.
- Do not add package names to queries - package information is already shared. For example, use `test resource table`, not `filament 4 test resource table`.

### Available Search Syntax
- You can and should pass multiple queries at once. The most relevant results will be returned first.

1. Simple Word Searches with auto-stemming - query=authentication - finds 'authenticate' and 'auth'
2. Multiple Words (AND Logic) - query=rate limit - finds knowledge containing both "rate" AND "limit"
3. Quoted Phrases (Exact Position) - query="infinite scroll" - Words must be adjacent and in that order
4. Mixed Queries - query=middleware "rate limit" - "middleware" AND exact phrase "rate limit"
5. Multiple Queries - queries=["authentication", "middleware"] - ANY of these terms


=== php rules ===

## PHP

- Always use curly braces for control structures, even if it has one line.
- **NO INLINE COMMENTS** - This is non-negotiable. Only docblocks (PHPDoc) or jsblocks are allowed. Never add inline comments within code.

### Constructors
- Use PHP 8 constructor property promotion in `__construct()`.
    - <code-snippet>public function __construct(public GitHub $github) { }</code-snippet>
- Do not allow empty `__construct()` methods with zero parameters.

### Type Declarations
- Always use explicit return type declarations for methods and functions.
- Use appropriate PHP type hints for method parameters.

<code-snippet name="Explicit Return Types and Method Params" lang="php">
protected function isAccessible(User $user, ?string $path = null): bool
{
    ...
}
</code-snippet>

## Comments
- Prefer PHPDoc blocks over comments. Never use comments within the code itself unless there is something _very_ complex going on.

## PHPDoc Blocks
- Add useful array shape type definitions for arrays when appropriate.

## Enums
- Typically, keys in an Enum should be TitleCase. For example: `FavoritePerson`, `BestLake`, `Monthly`.


=== herd rules ===

## Laravel Herd

- The application is served by Laravel Herd and will be available at: https?://[kebab-case-project-dir].test. Use the `get-absolute-url` tool to generate URLs for the user to ensure valid URLs.
- You must not run any commands to make the site available via HTTP(s). It is _always_ available through Laravel Herd.


=== laravel/core rules ===

## Do Things the Laravel Way

- Use `php artisan make:` commands to create new files (i.e. migrations, controllers, models, etc.). You can list available Artisan commands using the `list-artisan-commands` tool.
- If you're creating a generic PHP class, use `artisan make:class`.
- Pass `--no-interaction` to all Artisan commands to ensure they work without user input. You should also pass the correct `--options` to ensure correct behavior.

### Database
- Always use proper Eloquent relationship methods with return type hints. Prefer relationship methods over raw queries or manual joins.
- Use Eloquent models and relationships before suggesting raw database queries
- Avoid `DB::`; prefer `Model::query()`. Generate code that leverages Laravel's ORM capabilities rather than bypassing them.
- Generate code that prevents N+1 query problems by using eager loading.
- Use Laravel's query builder for very complex database operations.

### Model Creation
- When creating new models, create useful factories and seeders for them too. Ask the user if they need any other things, using `list-artisan-commands` to check the available options to `php artisan make:model`.

### APIs & Eloquent Resources
- For APIs, default to using Eloquent API Resources and API versioning unless existing API routes do not, then you should follow existing application convention.

### Controllers & Validation
- Always create Form Request classes for validation rather than inline validation in controllers. Include both validation rules and custom error messages.
- Check sibling Form Requests to see if the application uses array or string based validation rules.

### Queues
- Use queued jobs for time-consuming operations with the `ShouldQueue` interface.

### Authentication & Authorization
- Use Laravel's built-in authentication and authorization features (gates, policies, Sanctum, etc.).

### URL Generation
- When generating links to other pages, prefer named routes and the `route()` function.

### Configuration
- Use environment variables only in configuration files - never use the `env()` function directly outside of config files. Always use `config('app.name')`, not `env('APP_NAME')`.

### Testing
- When creating models for tests, use the factories for the models. Check if the factory has custom states that can be used before manually setting up the model.
- Faker: Use methods such as `$this->faker->word()` or `fake()->randomDigit()`. Follow existing conventions whether to use `$this->faker` or `fake()`.
- When creating tests, make use of `php artisan make:test [options] <name>` to create a feature test, and pass `--unit` to create a unit test. Most tests should be feature tests.

### Vite Error
- If you receive an "Illuminate\Foundation\ViteException: Unable to locate file in Vite manifest" error, you can run `npm run build` or ask the user to run `npm run dev` or `composer run dev`.


=== laravel/v12 rules ===

## Laravel 12

- Use the `search-docs` tool to get version specific documentation.
- Since Laravel 11, Laravel has a new streamlined file structure which this project uses.

### Laravel 12 Structure
- No middleware files in `app/Http/Middleware/`.
- `bootstrap/app.php` is the file to register middleware, exceptions, and routing files.
- `bootstrap/providers.php` contains application specific service providers.
- **No app\Console\Kernel.php** - use `bootstrap/app.php` or `routes/console.php` for console configuration.
- **Commands auto-register** - files in `app/Console/Commands/` are automatically available and do not require manual registration.

### Database
- When modifying a column, the migration must include all of the attributes that were previously defined on the column. Otherwise, they will be dropped and lost.
- Laravel 11 allows limiting eagerly loaded records natively, without external packages: `$query->latest()->limit(10);`.

### Models
- Casts can and likely should be set in a `casts()` method on a model rather than the `$casts` property. Follow existing conventions from other models.


=== livewire/core rules ===

## Livewire Core
- Use the `search-docs` tool to find exact version specific documentation for how to write Livewire & Livewire tests.
- Use the `php artisan make:livewire [Posts\\CreatePost]` artisan command to create new components
- State should live on the server, with the UI reflecting it.
- All Livewire requests hit the Laravel backend, they're like regular HTTP requests. Always validate form data, and run authorization checks in Livewire actions.

## Livewire Best Practices
- Livewire components require a single root element.
- Use `wire:loading` and `wire:dirty` for delightful loading states.
- Add `wire:key` in loops:

    ```blade
    @foreach ($items as $item)
        <div wire:key="item-{{ $item->id }}">
            {{ $item->name }}
        </div>
    @endforeach
    ```

- Prefer lifecycle hooks like `mount()`, `updatedFoo()` for initialization and reactive side effects:

<code-snippet name="Lifecycle hook examples" lang="php">
    public function mount(User $user) { $this->user = $user; }
    public function updatedSearch() { $this->resetPage(); }
</code-snippet>


## Testing Livewire

<code-snippet name="Example Livewire component test" lang="php">
    Livewire::test(Counter::class)
        ->assertSet('count', 0)
        ->call('increment')
        ->assertSet('count', 1)
        ->assertSee(1)
        ->assertStatus(200);
</code-snippet>


    <code-snippet name="Testing a Livewire component exists within a page" lang="php">
        $this->get('/posts/create')
        ->assertSeeLivewire(CreatePost::class);
    </code-snippet>


=== livewire/v3 rules ===

## Livewire 3

### Key Changes From Livewire 2
- These things changed in Livewire 2, but may not have been updated in this application. Verify this application's setup to ensure you conform with application conventions.
    - Use `wire:model.live` for real-time updates, `wire:model` is now deferred by default.
    - Components now use the `App\Livewire` namespace (not `App\Http\Livewire`).
    - Use `$this->dispatch()` to dispatch events (not `emit` or `dispatchBrowserEvent`).
    - Use the `components.layouts.app` view as the typical layout path (not `layouts.app`).

### New Directives
- `wire:show`, `wire:transition`, `wire:cloak`, `wire:offline`, `wire:target` are available for use. Use the documentation to find usage examples.

### Alpine
- Alpine is now included with Livewire, don't manually include Alpine.js.
- Plugins included with Alpine: persist, intersect, collapse, and focus.

### Lifecycle Hooks
- You can listen for `livewire:init` to hook into Livewire initialization, and `fail.status === 419` for the page expiring:

<code-snippet name="livewire:load example" lang="js">
document.addEventListener('livewire:init', function () {
    Livewire.hook('request', ({ fail }) => {
        if (fail && fail.status === 419) {
            alert('Your session expired');
        }
    });

    Livewire.hook('message.failed', (message, component) => {
        console.error(message);
    });
});
</code-snippet>


=== pint/core rules ===

## Laravel Pint Code Formatter

- You must run `vendor/bin/pint --dirty` before finalizing changes to ensure your code matches the project's expected style.
- Do not run `vendor/bin/pint --test`, simply run `vendor/bin/pint` to fix any formatting issues.


=== pest/core rules ===

## Pest

### Testing
- If you need to verify a feature is working, write or update a Unit / Feature test.

### Pest Tests
- All tests must be written using Pest. Use `php artisan make:test --pest <name>`.
- You must not remove any tests or test files from the tests directory without approval. These are not temporary or helper files - these are core to the application.
- Tests should test all of the happy paths, failure paths, and weird paths.
- Tests live in the `tests/Feature` and `tests/Unit` directories.
- Pest tests look and behave like this:
<code-snippet name="Basic Pest Test Example" lang="php">
it('is true', function () {
    expect(true)->toBeTrue();
});
</code-snippet>

### Running Tests
- Run the minimal number of tests using an appropriate filter before finalizing code edits.
- To run all tests: `php artisan test`.
- To run all tests in a file: `php artisan test tests/Feature/ExampleTest.php`.
- To filter on a particular test name: `php artisan test --filter=testName` (recommended after making a change to a related file).
- When the tests relating to your changes are passing, ask the user if they would like to run the entire test suite to ensure everything is still passing.

### Pest Assertions
- When asserting status codes on a response, use the specific method like `assertForbidden` and `assertNotFound` instead of using `assertStatus(403)` or similar, e.g.:
<code-snippet name="Pest Example Asserting postJson Response" lang="php">
it('returns all', function () {
    $response = $this->postJson('/api/docs', []);

    $response->assertSuccessful();
});
</code-snippet>

### Mocking
- Mocking can be very helpful when appropriate.
- When mocking, you can use the `Pest\Laravel\mock` Pest function, but always import it via `use function Pest\Laravel\mock;` before using it. Alternatively, you can use `$this->mock()` if existing tests do.
- You can also create partial mocks using the same import or self method.

### Datasets
- Use datasets in Pest to simplify tests which have a lot of duplicated data. This is often the case when testing validation rules, so consider going with this solution when writing tests for validation rules.

<code-snippet name="Pest Dataset Example" lang="php">
it('has emails', function (string $email) {
    expect($email)->not->toBeEmpty();
})->with([
    'james' => 'james@laravel.com',
    'taylor' => 'taylor@laravel.com',
]);
</code-snippet>


=== pest/v4 rules ===

## Pest 4

- Pest v4 is a huge upgrade to Pest and offers: browser testing, smoke testing, visual regression testing, test sharding, and faster type coverage.
- Browser testing is incredibly powerful and useful for this project.
- Browser tests should live in `tests/Browser/`.
- Use the `search-docs` tool for detailed guidance on utilizing these features.

### Browser Testing
- You can use Laravel features like `Event::fake()`, `assertAuthenticated()`, and model factories within Pest v4 browser tests, as well as `RefreshDatabase` (when needed) to ensure a clean state for each test.
- Interact with the page (click, type, scroll, select, submit, drag-and-drop, touch gestures, etc.) when appropriate to complete the test.
- If requested, test on multiple browsers (Chrome, Firefox, Safari).
- If requested, test on different devices and viewports (like iPhone 14 Pro, tablets, or custom breakpoints).
- Switch color schemes (light/dark mode) when appropriate.
- Take screenshots or pause tests for debugging when appropriate.

### Example Tests

<code-snippet name="Pest Browser Test Example" lang="php">
it('may reset the password', function () {
    Notification::fake();

    $this->actingAs(User::factory()->create());

    $page = visit('/sign-in'); // Visit on a real browser...

    $page->assertSee('Sign In')
        ->assertNoJavascriptErrors() // or ->assertNoConsoleLogs()
        ->click('Forgot Password?')
        ->fill('email', 'nuno@laravel.com')
        ->click('Send Reset Link')
        ->assertSee('We have emailed your password reset link!')

    Notification::assertSent(ResetPassword::class);
});
</code-snippet>

<code-snippet name="Pest Smoke Testing Example" lang="php">
$pages = visit(['/', '/about', '/contact']);

$pages->assertNoJavascriptErrors()->assertNoConsoleLogs();
</code-snippet>


=== tailwindcss/core rules ===

## Tailwind Core

- Use Tailwind CSS classes to style HTML, check and use existing tailwind conventions within the project before writing your own.
- Offer to extract repeated patterns into components that match the project's conventions (i.e. Blade, JSX, Vue, etc..)
- Think through class placement, order, priority, and defaults - remove redundant classes, add classes to parent or child carefully to limit repetition, group elements logically
- You can use the `search-docs` tool to get exact examples from the official documentation when needed.

### Spacing
- When listing items, use gap utilities for spacing, don't use margins.

    <code-snippet name="Valid Flex Gap Spacing Example" lang="html">
        <div class="flex gap-8">
            <div>Superior</div>
            <div>Michigan</div>
            <div>Erie</div>
        </div>
    </code-snippet>


### Dark Mode
- If existing pages and components support dark mode, new pages and components must support dark mode in a similar way, typically using `dark:`.


=== tailwindcss/v4 rules ===

## Tailwind 4

- Always use Tailwind CSS v4 - do not use the deprecated utilities.
- `corePlugins` is not supported in Tailwind v4.
- In Tailwind v4, configuration is CSS-first using the `@theme` directive — no separate `tailwind.config.js` file is needed.
<code-snippet name="Extending Theme in CSS" lang="css">
@theme {
  --color-brand: oklch(0.72 0.11 178);
}
</code-snippet>

- In Tailwind v4, you import Tailwind using a regular CSS `@import` statement, not using the `@tailwind` directives used in v3:

<code-snippet name="Tailwind v4 Import Tailwind Diff" lang="diff">
   - @tailwind base;
   - @tailwind components;
   - @tailwind utilities;
   + @import "tailwindcss";
</code-snippet>


### Replaced Utilities
- Tailwind v4 removed deprecated utilities. Do not use the deprecated option - use the replacement.
- Opacity values are still numeric.

| Deprecated |	Replacement |
|------------+--------------|
| bg-opacity-* | bg-black/* |
| text-opacity-* | text-black/* |
| border-opacity-* | border-black/* |
| divide-opacity-* | divide-black/* |
| ring-opacity-* | ring-black/* |
| placeholder-opacity-* | placeholder-black/* |
| flex-shrink-* | shrink-* |
| flex-grow-* | grow-* |
| overflow-ellipsis | text-ellipsis |
| decoration-slice | box-decoration-slice |
| decoration-clone | box-decoration-clone |


=== spire-ui/core rules ===

## Spire UI Component Library

This is a TALL stack component package. Follow these guidelines when building or modifying Spire-UI components.

### Core Philosophy
- **Maintainability first** - All solutions must be clean, follow modern package design principles, and be easy to refactor or extend.
- **Avoid thin wrappers** - Do not create components that are just simple wrappers around native functionality. If Laravel, Livewire, or Alpine provides a way to do something, use it directly.
- **Prioritize native solutions** - Always prefer native Blade/Laravel solutions first, then Livewire/PHP for server logic, and only use Alpine.js when client-side interactivity is necessary.
- **Check for existing components** - Always check for existing components to reuse before creating new ones.

### Technology Stack Priority
When building components, follow this implementation order:

1. **HTML & Tailwind First** - Structure and style the component using semantic HTML and Tailwind CSS utilities.
2. **PHP (Livewire/Blade) Next** - Use PHP for server-side logic, data binding (`wire:model`), and actions (`wire:click`).
3. **Alpine.js Last** - Only use Alpine.js if the component requires client-side interactivity that PHP cannot handle (e.g., opening/closing dropdowns, client-side validation feedback, tabs).
4. **Alpine Modules** - For complex components with extensive interactivity or repeated logic, create reusable Alpine modules using `Alpine.data(...)` to keep HTML clean.

### Project Structure & Naming
- **Folder-based components** - Each "main" component is a folder (e.g., `/dropdown`).
- **Parent component** - The `index.blade.php` file inside the folder is the main component (rendered as `<x-dropdown />`).
- **Child components (dot notation)** - Other Blade files within the same folder automatically become child components using dot notation (e.g., `item.blade.php` becomes `<x-dropdown.item />`).
- **Naming conventions** - Use TitleCase for folder names, descriptive names for variables/methods (e.g., `isRegisteredForDiscounts`, not `discount()`).

### Theming (Tailwind v4)
- **Central theme file** - All theme logic lives in `theme.css`.
- **Light/dark mode support** - All components must support both light and dark color schemes.
- **Semantic tokens required** - Use CSS variables for semantic tokens, not raw color utilities.
- **Token structure**:
  - **Base colors** - Set using relative color syntax.
  - **Semantic tokens** - Define tokens like `--color-body`, `--color-primary`, `--color-primary-hover`.
  - **Generated utilities** - Tokens generate corresponding Tailwind utilities (e.g., `bg-body`, `text-primary`, `bg-primary-hover`).

<code-snippet name="Theme Structure Example" lang="css">
@theme {
  /* Base colors with light/dark variants */
  --color-primary: oklch(0.55 0.15 250);
  --color-primary-hover: oklch(0.45 0.15 250);

  /* Semantic tokens for components */
  --color-body: light-dark(white, oklch(0.15 0 0));
  --color-text: light-dark(oklch(0.2 0 0), oklch(0.95 0 0));
}
</code-snippet>

### Accessibility (a11y)
All components must be fully accessible:

- **Keyboard navigation** - Full keyboard support for interactive components (dropdowns, tabs, modals).
- **ARIA attributes** - Correct use of `aria-expanded`, `aria-hidden`, `aria-labelledby`, `aria-describedby`, etc.
- **Focus states** - Provide clear `:focus-visible` styles for keyboard users.
- **Semantic HTML** - Use appropriate HTML elements (`<button>`, `<nav>`, `<dialog>`, etc.).
- **Screen reader support** - Ensure all interactive elements have appropriate labels and announcements.

### Key Development Patterns

#### Component Composition
- Use Blade slots (default and named) for all content that isn't part of the component's core structure.
- Allow developers to customize content without modifying the component itself.

<code-snippet name="Component Composition Example" lang="blade">
{{-- Component definition --}}
<div {{ $attributes->merge(['class' => 'dropdown']) }}>
    <button type="button">
        {{ $trigger }}
    </button>

    <div class="dropdown-menu">
        {{ $slot }}
    </div>
</div>

{{-- Usage --}}
<x-dropdown>
    <x-slot:trigger>
        Open Menu
    </x-slot:trigger>

    <x-dropdown.item>Option 1</x-dropdown.item>
    <x-dropdown.item>Option 2</x-dropdown.item>
</x-dropdown>
</code-snippet>

#### Validation & Error Handling
- Components must work with Laravel's validation system.
- Display errors from the `$errors` bag using `@error` directive.
- Apply styles to `:invalid` and `:user-invalid` states when validation fails.

<code-snippet name="Validation Pattern Example" lang="blade">
<input
    type="email"
    wire:model="email"
    @error('email') aria-invalid="true" aria-describedby="email-error" @enderror
    class="border @error('email') border-red-500 @else border-gray-300 @enderror"
/>

@error('email')
    <p id="email-error" class="text-red-500 text-sm">{{ $message }}</p>
@enderror
</code-snippet>

#### Livewire & Alpine Synchronization
To prevent Livewire's morphing from destroying Alpine component state, use this pattern:

- **Hidden input** - Use `<input type="hidden">` with `wire:model` to sync with Livewire.
- **wire:ignore** - Apply to the interactive element's root to prevent morphing.
- **Alpine sync** - Use Alpine to update the hidden input value when user interacts with the component.

<code-snippet name="Livewire Alpine Sync Pattern" lang="blade">
<div x-data="customSelect({ value: @entangle('selectedValue') })">
    {{-- Hidden input syncs with Livewire --}}
    <input type="hidden" wire:model="selectedValue" x-model="value" />

    {{-- Interactive component with wire:ignore --}}
    <div wire:ignore>
        <button @click="open = !open" type="button">
            <span x-text="selectedLabel"></span>
        </button>

        <ul x-show="open" @click.outside="open = false">
            <li @click="selectOption('value1', 'Label 1')">Label 1</li>
            <li @click="selectOption('value2', 'Label 2')">Label 2</li>
        </ul>
    </div>
</div>

<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('customSelect', (config) => ({
        value: config.value,
        open: false,
        selectedLabel: '',

        selectOption(val, label) {
            this.value = val;
            this.selectedLabel = label;
            this.open = false;
        }
    }));
});
</script>
</code-snippet>

**Note**: Alternative approaches to state synchronization can be recommended when requested.

#### Alpine State Management
Alpine provides powerful state management through reactive JavaScript data. Understanding how to structure and access state is critical for building Spire-UI components.

##### Local State with x-data
Declare component state directly in HTML using `x-data`. Any Alpine syntax within or on that element can access the state:

<code-snippet name="Local State Example" lang="blade">
<div x-data="{ open: false, count: 0 }">
    <button @click="open = !open">Toggle</button>
    <span x-text="count"></span>
</div>
</code-snippet>

##### Nested Scopes
Alpine naturally handles nested scopes - child elements can access parent data without special syntax. If a child has a property matching a parent's property name, the child property takes precedence:

<code-snippet name="Nested Scopes Example" lang="blade">
<div x-data="{ open: false, label: 'Parent' }">
    <span x-text="label"></span> <!-- Shows: Parent -->

    <div x-data="{ label: 'Child', count: 5 }">
        <span x-text="label"></span> <!-- Shows: Child -->
        <span x-show="open"></span> <!-- Accesses parent's 'open' -->
        <span x-text="count"></span> <!-- Shows: 5 -->
    </div>
</div>
</code-snippet>

**Important**: Do NOT use `$parent` to access parent scope data. Alpine's natural scope chain handles this automatically. Simply reference the property name directly.

##### Single-Element Data
You can declare data on the same element that uses it:

<code-snippet name="Single-Element Example" lang="blade">
<button x-data="{ label: 'Click Here' }" x-text="label"></button>
</code-snippet>

##### Data-less Alpine
When you only need Alpine functionality without reactive data:

<code-snippet name="Data-less Example" lang="blade">
<button x-data @click="alert('Clicked!')">Click Me</button>
</code-snippet>

##### Re-usable Components with Alpine.data()
For complex components with reusable logic, register them globally using `Alpine.data()`:

<code-snippet name="Reusable Component Example" lang="javascript">
Alpine.data('dropdown', () => ({
    open: false,

    toggle() {
        this.open = !this.open;
    },

    close() {
        this.open = false;
    }
}));
</code-snippet>

Usage in Blade:
<code-snippet name="Using Registered Component" lang="blade">
<div x-data="dropdown">
    <button @click="toggle">Toggle</button>
    <div x-show="open" @click.outside="close">
        Content
    </div>
</div>
</code-snippet>

##### Global State with Alpine.store()
For data that needs to be shared across multiple components on a page, use Alpine's global store:

<code-snippet name="Global Store Example" lang="javascript">
Alpine.store('tabs', {
    current: 'first',
    items: ['first', 'second', 'third'],

    setTab(name) {
        this.current = name;
    }
});
</code-snippet>

Access from anywhere using `$store`:
<code-snippet name="Accessing Global Store" lang="blade">
<div x-data>
    <template x-for="tab in $store.tabs.items">
        <button @click="$store.tabs.setTab(tab)" x-text="tab"></button>
    </template>
</div>

<div x-data>
    <span x-text="$store.tabs.current"></span>
</div>
</code-snippet>

**Best Practices**:
- Use local state (`x-data`) for component-specific data
- Use `Alpine.data()` for reusable component patterns
- Use `Alpine.store()` sparingly, only for truly global application state
- Never use `$parent` - rely on Alpine's natural scope chain
- Keep state as close to where it's used as possible

#### Blade Component Attributes
Master the `$attributes` bag for flexible components:

- **Merging** - Use `$attributes->merge([...])` for default attributes and `$attributes->class([...])` for default classes.
- **Conditional classes** - Use array syntax: `$attributes->class(['class-a' => $condition])`.
- **Prepending** - Use `$attributes->prepends('value')` for attributes like `data-controller`.
- **Filtering** - Use `filter()`, `whereStartsWith()`, `only()`, `except()` to manage passed attributes.

<code-snippet name="Blade Attributes Pattern" lang="blade">
{{-- Merge with defaults --}}
<button {{ $attributes->merge(['type' => 'button', 'class' => 'btn']) }}>
    {{ $slot }}
</button>

{{-- Conditional classes --}}
<div {{ $attributes->class([
    'input',
    'input-sm' => $size === 'small',
    'input-lg' => $size === 'large',
    'input-error' => $hasError,
]) }}>

{{-- Filter and split attributes --}}
<div {{ $attributes->only(['class', 'id']) }}>
    <input {{ $attributes->except(['class', 'id']) }} />
</div>
</code-snippet>

#### Tailwind Pseudo-Classes
Use Tailwind's pseudo-class variants to style all element states:

- **User interaction**: `hover:`, `focus:`, `focus-visible:`, `active:`
- **Form states**: `disabled:`, `checked:`, `indeterminate:`, `required:`, `invalid:`, `valid:`, `user-invalid:`, `placeholder-shown:`, `read-only:`
- **Structural**: `first:`, `last:`, `only:`, `odd:`, `even:`, `empty:`
- **Targeting**: `target:`, `focus-within:`

<code-snippet name="Pseudo-Class Usage Example" lang="blade">
<button
    class="
        bg-primary text-white
        hover:bg-primary-hover
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
    "
>
    Submit
</button>

<input
    type="text"
    class="
        border border-gray-300
        focus:border-primary focus:ring-2 focus:ring-primary/20
        invalid:border-red-500
        user-invalid:border-red-500
        disabled:bg-gray-100
        placeholder-shown:italic
    "
/>
</code-snippet>

#### Data Attributes
All Spire-UI components must use the `data-spire-*` prefix for custom data attributes:

- **Namespace all data attributes** - Prefix all custom data attributes with `data-spire-` to prevent conflicts with other libraries.
- **Use with Tailwind selectors** - Combine with Tailwind's data attribute selectors for conditional styling.
- **Clear intent** - The prefix makes it immediately clear which library added the attribute.
- **Examples**: `data-spire-grouped`, `data-spire-active`, `data-spire-state`, `data-spire-variant`

<code-snippet name="Data Attributes Pattern" lang="blade">
{{-- Setting data attributes --}}
<button {{ $attributes->merge([
    'data-spire-grouped' => $grouped ? 'true' : null,
    'data-spire-variant' => $variant,
]) }}>

{{-- Tailwind selectors targeting data attributes --}}
<button
    class="
        rounded-md
        data-[spire-grouped=true]:rounded-none
        first:data-[spire-grouped=true]:rounded-l-md
        last:data-[spire-grouped=true]:rounded-r-md
        data-[spire-variant=primary]:bg-primary
        data-[spire-variant=secondary]:bg-secondary
    "
    data-spire-grouped="true"
    data-spire-variant="primary"
>
    Button
</button>

{{-- Alpine.js accessing data attributes --}}
<div x-data="{ variant: $el.dataset.spireVariant }">
</div>
</code-snippet>

**Do NOT use unprefixed data attributes** (e.g., `data-grouped`, `data-active`). Always use the `data-spire-` prefix.

### Localization
- **i18n support** - All components must support localization for English, French, and Arabic.
- **Use Laravel's localization** - Use `__('key')` for all user-facing strings.
- **Translation keys** - Organize translation keys logically (e.g., `spire-ui::dropdown.close`, `spire-ui::modal.confirm`).

<code-snippet name="Localization Example" lang="blade">
<button aria-label="{{ __('spire-ui::dropdown.toggle') }}">
    {{ __('spire-ui::dropdown.menu') }}
</button>

<dialog>
    <h2>{{ __('spire-ui::modal.confirm_title') }}</h2>
    <p>{{ __('spire-ui::modal.confirm_message') }}</p>

    <button>{{ __('spire-ui::common.cancel') }}</button>
    <button>{{ __('spire-ui::common.confirm') }}</button>
</dialog>
</code-snippet>

### Testing Awareness
- **Write testable code** - All components should be designed with testing in mind.
- **PEST for Blade/Livewire** - Use PEST for testing Blade components and Livewire logic (unit/feature tests).
- **PEST Browser tests for Alpine** - Use PEST v4 browser testing for testing Alpine.js interactivity and browser behavior.
- **Test all paths** - Test happy paths, failure paths, and edge cases.
- **Test accessibility** - Verify keyboard navigation, ARIA attributes, and screen reader compatibility.

<code-snippet name="Component Testing Example" lang="php">
// Feature test for Livewire component
it('can toggle dropdown', function () {
    Livewire::test(DropdownComponent::class)
        ->assertSet('open', false)
        ->call('toggle')
        ->assertSet('open', true)
        ->call('toggle')
        ->assertSet('open', false);
});

// Browser test for Alpine interactivity
it('opens dropdown on click', function () {
    $page = visit('/components/dropdown');

    $page->assertSee('Dropdown Menu')
        ->assertDontSee('Option 1')
        ->click('[aria-label="Toggle dropdown"]')
        ->assertSee('Option 1')
        ->assertSee('Option 2')
        ->assertNoJavascriptErrors();
});
</code-snippet>

</laravel-boost-guidelines>
