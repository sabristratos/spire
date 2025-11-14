<div class="bg-surface border border-border rounded-lg p-6">
    <div class="mb-6">
        <h3 class="text-lg font-semibold text-text mb-2">Component Test (Livewire Integration)</h3>
        <p class="text-sm text-text-muted mb-4">Test form submission with select components and verify dropdown stays open during Livewire updates.</p>

        @if($successMessage)
            <div class="p-4 bg-success/10 border border-success/20 rounded-lg mb-4">
                <p class="text-sm text-success">{{ $successMessage }}</p>
            </div>
        @endif
    </div>

    <div class="space-y-6">
        <div>
            <h4 class="text-sm font-semibold text-text mb-3">Select Components Test (Livewire Integration)</h4>

            <form wire:submit="save" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-text mb-2">
                            Select Fruit <span class="text-text-muted">(controls countries)</span>
                        </label>
                        <x-spire::select wire:model.live="selectedFruit" placeholder="Choose a fruit">
                            <x-spire::select.trigger />

                            <x-spire::select.content>
                                <x-spire::select.option value="apple">Apple</x-spire::select.option>
                                <x-spire::select.option value="banana">Banana</x-spire::select.option>
                                <x-spire::select.option value="cherry">Cherry</x-spire::select.option>
                                <x-spire::select.option value="date">Date</x-spire::select.option>
                                <x-spire::select.option value="elderberry">Elderberry</x-spire::select.option>
                            </x-spire::select.content>
                        </x-spire::select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-text mb-2">
                            Select Country <span class="text-text-muted">(cascades from fruit)</span>
                        </label>
                        <x-spire::select wire:model="selectedCountry" placeholder="Choose a country">
                            <x-spire::select.trigger />

                            <x-spire::select.content>
                                @forelse($this->availableCountries as $code => $name)
                                    <x-spire::select.option value="{{ $code }}">{{ $name }}</x-spire::select.option>
                                @empty
                                    <div class="px-3 py-2 text-sm text-text-muted">Select a fruit first</div>
                                @endforelse
                            </x-spire::select.content>
                        </x-spire::select>
                    </div>
                </div>

                <div class="flex items-center gap-4 p-3 bg-surface-subtle rounded-lg">
                    <div class="flex-1">
                        <div class="text-xs text-text-muted">Selected Values:</div>
                        <div class="text-sm text-text">
                            <span class="font-medium">Fruit:</span> {{ $selectedFruit ?: 'None' }} |
                            <span class="font-medium">Country:</span> {{ $selectedCountry ?: 'None' }}
                        </div>
                    </div>
                    <x-spire::button wire:click="resetSelections" variant="bordered" size="sm" type="button">
                        Reset Selections
                    </x-spire::button>
                </div>

                <div class="flex items-center gap-3">
                    <x-spire::button type="submit" color="primary">
                        Save Form
                    </x-spire::button>
                    <p class="text-sm text-text-muted">Submit the form to test Livewire updates with components.</p>
                </div>
            </form>

            <div class="mt-3 p-3 bg-info/10 border border-info/20 rounded-lg">
                <p class="text-sm text-text">
                    <span class="font-semibold">Test:</span> Open a select dropdown and submit the form. The dropdown should stay open during the Livewire update.
                    Try changing fruit to see country options update. Click reset to clear via Livewire.
                </p>
            </div>
        </div>

        <div>
            <p class="text-sm font-medium text-text mb-3">Test Dropdown (should stay open during Livewire updates):</p>

            <x-spire::dropdown>
                <x-spire::dropdown.trigger>
                    <x-spire::button color="primary">
                        <x-spire::icon name="menu" class="w-4 h-4" />
                        Test Dropdown
                    </x-spire::button>
                </x-spire::dropdown.trigger>

                <x-spire::dropdown.content width="lg">
                    <x-spire::dropdown.label>Main Actions</x-spire::dropdown.label>
                    <x-spire::dropdown.item icon="edit">Edit Item</x-spire::dropdown.item>
                    <x-spire::dropdown.item icon="copy">Duplicate</x-spire::dropdown.item>
                    <x-spire::dropdown.item icon="archive">Archive</x-spire::dropdown.item>

                    <x-spire::dropdown.separator />

                    <x-spire::dropdown.submenu label="Share Options" icon="share">
                        <x-spire::dropdown.item icon="mail">Email</x-spire::dropdown.item>
                        <x-spire::dropdown.item icon="link">Copy Link</x-spire::dropdown.item>
                        <x-spire::dropdown.item icon="twitter">Twitter</x-spire::dropdown.item>
                        <x-spire::dropdown.item icon="facebook">Facebook</x-spire::dropdown.item>
                    </x-spire::dropdown.submenu>

                    <x-spire::dropdown.submenu label="Move to Folder" icon="folder">
                        <x-spire::dropdown.item icon="folder">Personal</x-spire::dropdown.item>
                        <x-spire::dropdown.item icon="folder">Work</x-spire::dropdown.item>
                        <x-spire::dropdown.submenu label="Team Folders" icon="users">
                            <x-spire::dropdown.item icon="folder">Marketing</x-spire::dropdown.item>
                            <x-spire::dropdown.item icon="folder">Development</x-spire::dropdown.item>
                            <x-spire::dropdown.item icon="folder">Design</x-spire::dropdown.item>
                        </x-spire::dropdown.submenu>
                    </x-spire::dropdown.submenu>

                    <x-spire::dropdown.separator />

                    <x-spire::dropdown.label>Danger Zone</x-spire::dropdown.label>
                    <x-spire::dropdown.item icon="trash" destructive>Delete</x-spire::dropdown.item>
                </x-spire::dropdown.content>
            </x-spire::dropdown>
        </div>

        <div class="mt-4 p-4 bg-info/10 border border-info/20 rounded-lg">
            <p class="text-sm text-text">
                <span class="font-semibold">Expected behavior:</span> The dropdown should remain open when Livewire updates occur (e.g., form submission).
                Open the dropdown or submenu, then submit the form above. The dropdown should stay open.
            </p>
        </div>
    </div>
</div>
