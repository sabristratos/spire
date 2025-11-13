<div class="max-w-2xl mx-auto p-6 bg-surface border border-border rounded-lg">
    <h2 class="text-2xl font-bold text-text mb-6">Livewire Form Testing</h2>

    @if($submitted)
        <x-spire::alert
            variant="solid"
            color="success"
            class="mb-6"
            closable
        >
            Form submitted successfully! All validation passed.
        </x-spire::alert>
    @endif

    @if(session()->has('success'))
        <x-spire::alert
            variant="solid"
            color="success"
            class="mb-6"
            closable
        >
            {{ session('success') }}
        </x-spire::alert>
    @endif

    <form wire:submit="submit" class="space-y-6">
        {{-- Field Component with validation --}}
        <x-spire::field
            label="Full Name"
            for="name"
            required
            helper="Enter your full name (min 3 characters)"
            error="name"
        >
            <x-spire::input
                id="name"
                wire:model.blur="name"
                icon="user-01"
                placeholder="John Doe"
            />
        </x-spire::field>

        {{-- Email with clearable --}}
        <x-spire::field
            label="Email Address"
            for="email"
            required
            helper="We'll never share your email"
            error="email"
        >
            <x-spire::input
                id="email"
                type="email"
                wire:model.blur="email"
                icon="mail"
                clearable
                placeholder="john@example.com"
            />
        </x-spire::field>

        {{-- Password with viewable --}}
        <x-spire::field
            label="Password"
            for="password"
            required
            helper="Must be at least 8 characters"
            error="password"
        >
            <x-spire::input
                id="password"
                type="password"
                wire:model.blur="password"
                viewable
                placeholder="Enter password"
            />
        </x-spire::field>

        {{-- Search with clearable and live model --}}
        <x-spire::field
            label="Search"
            for="search"
            helper="Live search (updates as you type)"
        >
            <x-spire::input
                id="search"
                wire:model.live="search"
                icon="search-md"
                clearable
                placeholder="Start typing..."
            />
        </x-spire::field>

        @if($search)
            <div class="p-3 bg-surface-subtle rounded-md text-sm text-text-muted">
                Live search value: <span class="font-medium text-text">{{ $search }}</span>
            </div>
        @endif

        {{-- API Token with copyable --}}
        <x-spire::field
            label="API Token"
            for="token"
            helper="Click the copy button to copy to clipboard"
        >
            <x-spire::input
                id="token"
                wire:model="apiToken"
                readonly
                copyable
            />
        </x-spire::field>

        {{-- Message textarea placeholder showing slots work --}}
        <div>
            <x-spire::form.label for="message">
                Message (Optional)
            </x-spire::form.label>

            <div class="mt-1.5">
                <textarea
                    id="message"
                    wire:model.blur="message"
                    rows="4"
                    placeholder="Enter your message (min 10 characters if provided)"
                    class="w-full px-3 py-2 border border-border rounded-md bg-surface text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-fast"
                ></textarea>
            </div>

            <div class="mt-1.5">
                <x-spire::form.error name="message" />
            </div>
        </div>

        {{-- Submit and Reset buttons --}}
        <div class="flex gap-3">
            <x-spire::button
                type="submit"
                color="primary"
                wire:loading.attr="disabled"
            >
                <span wire:loading.remove wire:target="submit">Submit Form</span>
                <span wire:loading wire:target="submit">Submitting...</span>
            </x-spire::button>

            <x-spire::button
                type="button"
                variant="bordered"
                wire:click="resetForm"
            >
                Reset
            </x-spire::button>
        </div>
    </form>

    {{-- Display current state for debugging --}}
    <div class="mt-8 p-4 bg-surface-subtle rounded-md">
        <h3 class="text-sm font-semibold text-text mb-2">Current Form State:</h3>
        <div class="space-y-1 text-xs font-mono text-text-muted">
            <div><span class="text-text">name:</span> {{ $name ?: '(empty)' }}</div>
            <div><span class="text-text">email:</span> {{ $email ?: '(empty)' }}</div>
            <div><span class="text-text">password:</span> {{ $password ? str_repeat('•', strlen($password)) : '(empty)' }}</div>
            <div><span class="text-text">search:</span> {{ $search ?: '(empty)' }}</div>
            <div><span class="text-text">message:</span> {{ $message ?: '(empty)' }}</div>
            <div><span class="text-text">submitted:</span> {{ $submitted ? 'true' : 'false' }}</div>
        </div>
    </div>
</div>
