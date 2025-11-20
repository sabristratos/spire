@props(['name', 'set' => 'lucide'])

@php
    $prefix = config('spire-ui.prefix', 'spire');
    $componentName = "{$prefix}::icon.icons.{$set}.{$name}";

    $iconPath = resource_path("views/vendor/{$prefix}/icon/icons/{$set}/{$name}.blade.php");
    if (!file_exists($iconPath)) {
        $iconPath = base_path("packages/spire-ui/resources/views/components/icon/icons/{$set}/{$name}.blade.php");
    }

    $iconExists = file_exists($iconPath);
@endphp

@if($iconExists)
    <x-dynamic-component :component="$componentName" {{ $attributes }} />
@else
    @if(config('app.debug'))
        <svg {{ $attributes->merge(['class' => 'inline-block']) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            <title>Icon not found: {{ $set }}/{{ $name }}</title>
        </svg>
    @else
        <svg {{ $attributes->merge(['class' => 'inline-block']) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    @endif
@endif
