<div class="min-h-screen bg-body p-8">
    <div class="max-w-7xl mx-auto space-y-12">
        {{-- Header --}}
        <div class="text-center space-y-2">
            <h1 class="text-4xl font-bold text-text">Spire UI Component Demos</h1>
            <p class="text-lg text-text-muted">Interactive components with Livewire integration</p>
        </div>

        {{-- Time Picker Demos --}}
        <div class="space-y-6">
            <div class="flex items-center gap-3 border-b border-border pb-3">
                <x-spire::icon name="clock" class="w-6 h-6 text-primary" />
                <h2 class="text-2xl font-bold text-text">Time Picker</h2>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {{-- Basic Time Picker --}}
                <div class="bg-surface border border-border rounded-lg p-6 space-y-4">
                    <div>
                        <h3 class="text-lg font-semibold text-text">Basic Time Picker</h3>
                        <p class="text-sm text-text-muted mt-1">12-hour format with auto-locale detection</p>
                    </div>

                    <x-spire::timepicker
                        wire:model.live="appointmentTime"
                        placeholder="Select appointment time"
                    />

                    <div class="p-4 bg-surface-subtle rounded-md border border-border">
                        <p class="text-sm font-medium text-text mb-2">Selected Time:</p>
                        @if($appointmentTime)
                            <p class="text-base font-mono text-primary">{{ $appointmentTime }}</p>
                        @else
                            <p class="text-sm text-text-muted italic">No time selected</p>
                        @endif
                    </div>
                </div>

                {{-- Time Picker with 5-minute steps --}}
                <div class="bg-surface border border-border rounded-lg p-6 space-y-4">
                    <div>
                        <h3 class="text-lg font-semibold text-text">5-Minute Steps</h3>
                        <p class="text-sm text-text-muted mt-1">Minutes displayed in 5-minute intervals</p>
                    </div>

                    <x-spire::timepicker
                        wire:model.live="meetingTime"
                        :minuteStep="5"
                        placeholder="Select meeting time"
                    />

                    <div class="p-4 bg-surface-subtle rounded-md border border-border">
                        <p class="text-sm font-medium text-text mb-2">Selected Time:</p>
                        @if($meetingTime)
                            <p class="text-base font-mono text-primary">{{ $meetingTime }}</p>
                        @else
                            <p class="text-sm text-text-muted italic">No time selected</p>
                        @endif
                    </div>
                </div>

                {{-- Time Picker with 15-minute steps --}}
                <div class="bg-surface border border-border rounded-lg p-6 space-y-4">
                    <div>
                        <h3 class="text-lg font-semibold text-text">15-Minute Steps</h3>
                        <p class="text-sm text-text-muted mt-1">Quick selection with 15-minute intervals</p>
                    </div>

                    <x-spire::timepicker
                        wire:model.live="eventTime"
                        :minuteStep="15"
                        placeholder="Select event time"
                    />

                    <div class="p-4 bg-surface-subtle rounded-md border border-border">
                        <p class="text-sm font-medium text-text mb-2">Selected Time:</p>
                        @if($eventTime)
                            <p class="text-base font-mono text-primary">{{ $eventTime }}</p>
                        @else
                            <p class="text-sm text-text-muted italic">No time selected</p>
                        @endif
                    </div>
                </div>

                {{-- 24-hour format --}}
                <div class="bg-surface border border-border rounded-lg p-6 space-y-4">
                    <div>
                        <h3 class="text-lg font-semibold text-text">24-Hour Format</h3>
                        <p class="text-sm text-text-muted mt-1">Military time format without AM/PM</p>
                    </div>

                    <x-spire::timepicker
                        wire:model.live="time24Hour"
                        :use24Hour="true"
                        placeholder="Select time (24h)"
                    />

                    <div class="p-4 bg-surface-subtle rounded-md border border-border">
                        <p class="text-sm font-medium text-text mb-2">Selected Time:</p>
                        @if($time24Hour)
                            <p class="text-base font-mono text-primary">{{ $time24Hour }}</p>
                        @else
                            <p class="text-sm text-text-muted italic">No time selected</p>
                        @endif
                    </div>
                </div>

                {{-- With seconds --}}
                <div class="bg-surface border border-border rounded-lg p-6 space-y-4">
                    <div>
                        <h3 class="text-lg font-semibold text-text">With Seconds</h3>
                        <p class="text-sm text-text-muted mt-1">Includes seconds selection column</p>
                    </div>

                    <x-spire::timepicker
                        wire:model.live="timeWithSeconds"
                        :showSeconds="true"
                        placeholder="Select precise time"
                    />

                    <div class="p-4 bg-surface-subtle rounded-md border border-border">
                        <p class="text-sm font-medium text-text mb-2">Selected Time:</p>
                        @if($timeWithSeconds)
                            <p class="text-base font-mono text-primary">{{ $timeWithSeconds }}</p>
                        @else
                            <p class="text-sm text-text-muted italic">No time selected</p>
                        @endif
                    </div>
                </div>
            </div>
        </div>

        {{-- Select Component Demos --}}
        <div class="space-y-6">
            <div class="flex items-center gap-3 border-b border-border pb-3">
                <x-spire::icon name="list" class="w-6 h-6 text-primary" />
                <h2 class="text-2xl font-bold text-text">Select & Dropdown</h2>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {{-- Basic Select --}}
                <div class="bg-surface border border-border rounded-lg p-6 space-y-4">
                    <div>
                        <h3 class="text-lg font-semibold text-text">Basic Select</h3>
                        <p class="text-sm text-text-muted mt-1">Single selection dropdown</p>
                    </div>

                    <x-spire::select wire:model.live="selectedFruit" placeholder="Choose a fruit">
                        <x-spire::select.option value="apple">🍎 Apple</x-spire::select.option>
                        <x-spire::select.option value="banana">🍌 Banana</x-spire::select.option>
                        <x-spire::select.option value="orange">🍊 Orange</x-spire::select.option>
                        <x-spire::select.option value="grape">🍇 Grape</x-spire::select.option>
                        <x-spire::select.option value="strawberry">🍓 Strawberry</x-spire::select.option>
                    </x-spire::select>

                    <div class="p-4 bg-surface-subtle rounded-md border border-border">
                        <p class="text-sm font-medium text-text mb-2">Selected:</p>
                        @if($selectedFruit)
                            <p class="text-base font-mono text-primary">{{ $selectedFruit }}</p>
                        @else
                            <p class="text-sm text-text-muted italic">No selection</p>
                        @endif
                    </div>
                </div>

                {{-- Multiple Select --}}
                <div class="bg-surface border border-border rounded-lg p-6 space-y-4">
                    <div>
                        <h3 class="text-lg font-semibold text-text">Multiple Select</h3>
                        <p class="text-sm text-text-muted mt-1">Select multiple options</p>
                    </div>

                    <x-spire::select wire:model.live="selectedColors" multiple placeholder="Choose colors">
                        <x-spire::select.option value="red">🔴 Red</x-spire::select.option>
                        <x-spire::select.option value="blue">🔵 Blue</x-spire::select.option>
                        <x-spire::select.option value="green">🟢 Green</x-spire::select.option>
                        <x-spire::select.option value="yellow">🟡 Yellow</x-spire::select.option>
                        <x-spire::select.option value="purple">🟣 Purple</x-spire::select.option>
                        <x-spire::select.option value="orange">🟠 Orange</x-spire::select.option>
                    </x-spire::select>

                    <div class="p-4 bg-surface-subtle rounded-md border border-border">
                        <p class="text-sm font-medium text-text mb-2">Selected Colors:</p>
                        @if(count($selectedColors) > 0)
                            <ul class="space-y-1">
                                @foreach($selectedColors as $color)
                                    <li class="text-sm font-mono text-primary">{{ $color }}</li>
                                @endforeach
                            </ul>
                        @else
                            <p class="text-sm text-text-muted italic">No colors selected</p>
                        @endif
                    </div>
                </div>

                {{-- Buttons --}}
                <div class="bg-surface border border-border rounded-lg p-6 space-y-4">
                    <div>
                        <h3 class="text-lg font-semibold text-text">Button Variants</h3>
                        <p class="text-sm text-text-muted mt-1">Different button styles</p>
                    </div>

                    <div class="space-y-3">
                        <div class="flex flex-wrap gap-2">
                            <x-spire::button variant="solid" color="primary">Primary</x-spire::button>
                            <x-spire::button variant="solid" color="secondary">Secondary</x-spire::button>
                        </div>

                        <div class="flex flex-wrap gap-2">
                            <x-spire::button variant="bordered" color="primary">Bordered</x-spire::button>
                            <x-spire::button variant="ghost" color="primary">Ghost</x-spire::button>
                        </div>

                        <div class="flex flex-wrap gap-2">
                            <x-spire::button size="sm">Small</x-spire::button>
                            <x-spire::button size="md">Medium</x-spire::button>
                            <x-spire::button size="lg">Large</x-spire::button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- Calendar Demos --}}
        <div class="space-y-6">
            <div class="flex items-center gap-3 border-b border-border pb-3">
                <x-spire::icon name="calendar" class="w-6 h-6 text-primary" />
                <h2 class="text-2xl font-bold text-text">Calendar & Date Picker</h2>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {{-- Single Date Selection --}}
                <div class="bg-surface border border-border rounded-lg p-6 space-y-4">
                    <div>
                        <h3 class="text-lg font-semibold text-text">Single Date</h3>
                        <p class="text-sm text-text-muted mt-1">Select a single date from the calendar</p>
                    </div>

                    <div class="w-full max-w-xs mx-auto">
                        <x-spire::calendar
                            wire:model.live="singleDate"
                            mode="single"
                        />
                    </div>

                    <div class="p-4 bg-surface-subtle rounded-md border border-border">
                        <p class="text-sm font-medium text-text mb-2">Selected Date:</p>
                        @if($singleDate)
                            <p class="text-base font-mono text-primary">{{ $singleDate }}</p>
                        @else
                            <p class="text-sm text-text-muted italic">No date selected</p>
                        @endif
                    </div>
                </div>

                {{-- Date Range Selection --}}
                <div class="bg-surface border border-border rounded-lg p-6 space-y-4">
                    <div>
                        <h3 class="text-lg font-semibold text-text">Date Range</h3>
                        <p class="text-sm text-text-muted mt-1">Select start and end dates</p>
                    </div>

                    <div class="w-full max-w-xs mx-auto">
                        <x-spire::calendar
                            wire:model.live="dateRange"
                            mode="range"
                        />
                    </div>

                    <div class="p-4 bg-surface-subtle rounded-md border border-border">
                        <p class="text-sm font-medium text-text mb-2">Selected Range:</p>
                        @if($dateRange && $dateRange->start())
                            <div class="space-y-1">
                                <p class="text-sm text-text">
                                    <span class="font-medium">Start:</span>
                                    <span class="font-mono text-primary">{{ $dateRange->start()->format('Y-m-d') }}</span>
                                </p>
                                @if($dateRange->end())
                                    <p class="text-sm text-text">
                                        <span class="font-medium">End:</span>
                                        <span class="font-mono text-primary">{{ $dateRange->end()->format('Y-m-d') }}</span>
                                    </p>
                                    <p class="text-sm text-text">
                                        <span class="font-medium">Days:</span>
                                        <span class="font-mono text-primary">{{ $dateRange->days() }}</span>
                                    </p>
                                @endif
                            </div>
                        @else
                            <p class="text-sm text-text-muted italic">No range selected</p>
                        @endif
                    </div>
                </div>

                {{-- Multiple Dates Selection --}}
                <div class="bg-surface border border-border rounded-lg p-6 space-y-4">
                    <div>
                        <h3 class="text-lg font-semibold text-text">Multiple Dates</h3>
                        <p class="text-sm text-text-muted mt-1">Select multiple individual dates</p>
                    </div>

                    <div class="w-full max-w-xs mx-auto">
                        <x-spire::calendar
                            wire:model.live="multipleDates"
                            mode="multiple"
                            :maxDates="5"
                        />
                    </div>

                    <div class="p-4 bg-surface-subtle rounded-md border border-border">
                        <p class="text-sm font-medium text-text mb-2">Selected Dates:</p>
                        @if(count($multipleDates) > 0)
                            <ul class="space-y-1">
                                @foreach($multipleDates as $date)
                                    <li class="text-sm font-mono text-primary">{{ $date }}</li>
                                @endforeach
                            </ul>
                        @else
                            <p class="text-sm text-text-muted italic">No dates selected</p>
                        @endif
                    </div>
                </div>

                {{-- Range with Presets --}}
                <div class="bg-surface border border-border rounded-lg p-6 space-y-4 lg:col-span-2">
                    <div>
                        <h3 class="text-lg font-semibold text-text">Range with Presets</h3>
                        <p class="text-sm text-text-muted mt-1">Quick date range selection with preset options</p>
                    </div>

                    <div class="w-full max-w-2xl mx-auto">
                        <x-spire::calendar
                            wire:model.live="dateRangeWithPresets"
                            mode="range"
                            show-presets
                        />
                    </div>

                    <div class="p-4 bg-surface-subtle rounded-md border border-border">
                        <p class="text-sm font-medium text-text mb-2">Selected Range:</p>
                        @if($dateRangeWithPresets && $dateRangeWithPresets->start())
                            <div class="space-y-1">
                                <p class="text-sm text-text">
                                    <span class="font-medium">Start:</span>
                                    <span class="font-mono text-primary">{{ $dateRangeWithPresets->start()->format('Y-m-d') }}</span>
                                </p>
                                @if($dateRangeWithPresets->end())
                                    <p class="text-sm text-text">
                                        <span class="font-medium">End:</span>
                                        <span class="font-mono text-primary">{{ $dateRangeWithPresets->end()->format('Y-m-d') }}</span>
                                    </p>
                                    <p class="text-sm text-text">
                                        <span class="font-medium">Days:</span>
                                        <span class="font-mono text-primary">{{ $dateRangeWithPresets->days() }}</span>
                                    </p>
                                @endif
                                @if($dateRangeWithPresets->preset())
                                    <p class="text-sm text-text">
                                        <span class="font-medium">Preset:</span>
                                        <span class="font-mono text-primary">{{ $dateRangeWithPresets->preset()->value }}</span>
                                    </p>
                                @endif
                            </div>
                        @else
                            <p class="text-sm text-text-muted italic">No range selected</p>
                        @endif
                    </div>
                </div>
            </div>
        </div>

        {{-- Alerts --}}
        <div class="space-y-6">
            <div class="flex items-center gap-3 border-b border-border pb-3">
                <x-spire::icon name="alert-circle" class="w-6 h-6 text-primary" />
                <h2 class="text-2xl font-bold text-text">Alerts & Feedback</h2>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <x-spire::alert variant="solid" color="success">
                    <x-slot:title>Success!</x-slot:title>
                    Your time has been saved successfully.
                </x-spire::alert>

                <x-spire::alert variant="solid" color="error">
                    <x-slot:title>Error</x-slot:title>
                    The selected time is outside business hours.
                </x-spire::alert>
            </div>
        </div>

        {{-- Footer --}}
        <div class="text-center text-sm text-text-muted border-t border-border pt-6">
            <p>All components use <code class="px-2 py-1 bg-surface-subtle rounded font-mono text-primary">wire:model.live</code> for real-time synchronization</p>
            <p class="mt-2">Built with Spire UI • Livewire • Alpine.js • Tailwind CSS v4</p>
        </div>
    </div>
</div>
