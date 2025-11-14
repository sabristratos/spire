<div class="min-h-screen bg-body p-8">
    <div class="max-w-7xl mx-auto space-y-12">
        <div class="text-center space-y-2">
            <h1 class="text-4xl font-bold text-text">Calendar Component Demo</h1>
            <p class="text-lg text-text-muted">Interactive calendar with Livewire integration</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="space-y-4">
                <div class="bg-surface border border-border rounded-lg p-6 space-y-4">
                    <h2 class="text-xl font-semibold text-text">Single Date Selection</h2>
                    <p class="text-sm text-text-muted">Select a single date from the calendar</p>

                    <x-spire::calendar
                        wire:model.live="singleDate"
                        mode="single"
                    />

                    <div class="mt-4 p-4 bg-surface-subtle rounded-md border border-border">
                        <p class="text-sm font-medium text-text mb-2">Selected Date:</p>
                        @if($singleDate)
                            <p class="text-base font-mono text-primary">{{ $singleDate }}</p>
                        @else
                            <p class="text-sm text-text-muted italic">No date selected</p>
                        @endif
                    </div>
                </div>
            </div>

            <div class="space-y-4">
                <div class="bg-surface border border-border rounded-lg p-6 space-y-4">
                    <h2 class="text-xl font-semibold text-text">Multiple Date Selection</h2>
                    <p class="text-sm text-text-muted">Select multiple dates from the calendar</p>

                    <x-spire::calendar
                        wire:model.live="multipleDates"
                        mode="multiple"
                    />

                    <div class="mt-4 p-4 bg-surface-subtle rounded-md border border-border">
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
            </div>

            <div class="space-y-4">
                <div class="bg-surface border border-border rounded-lg p-6 space-y-4">
                    <h2 class="text-xl font-semibold text-text">Date Range Selection</h2>
                    <p class="text-sm text-text-muted">Select a start and end date</p>

                    <x-spire::calendar
                        wire:model.live="dateRange"
                        mode="range"
                    />

                    <div class="mt-4 p-4 bg-surface-subtle rounded-md border border-border">
                        <p class="text-sm font-medium text-text mb-2">Selected Range:</p>
                        @if($dateRange && isset($dateRange['start']) && isset($dateRange['end']))
                            <div class="space-y-1">
                                <p class="text-sm"><span class="font-medium text-text">Start:</span> <span class="font-mono text-primary">{{ $dateRange['start'] }}</span></p>
                                <p class="text-sm"><span class="font-medium text-text">End:</span> <span class="font-mono text-primary">{{ $dateRange['end'] }}</span></p>
                            </div>
                        @elseif($dateRange && isset($dateRange['start']))
                            <p class="text-sm"><span class="font-medium text-text">Start:</span> <span class="font-mono text-primary">{{ $dateRange['start'] }}</span></p>
                            <p class="text-sm text-text-muted italic mt-1">Select an end date</p>
                        @else
                            <p class="text-sm text-text-muted italic">No range selected</p>
                        @endif
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-surface border border-border rounded-lg p-6 space-y-4">
            <h2 class="text-xl font-semibold text-text">Date Range with Presets</h2>
            <p class="text-sm text-text-muted">Quick selection with preset date ranges</p>

            <x-spire::calendar
                wire:model.live="dateRange"
                mode="range"
                :show-presets="true"
                size="lg"
            />
        </div>

        <div class="text-center text-sm text-text-muted">
            <p>All calendars are using <code class="px-2 py-1 bg-surface-subtle rounded font-mono text-primary">wire:model.live</code> for real-time synchronization</p>
        </div>
    </div>
</div>
