<?php

$owner = 'mckenziearts';
$repo = 'blade-untitledui-icons';
$path = 'resources/svg';
$targetDir = __DIR__ . '/packages/spire-ui/resources/views/components/icon/icons/untitledui';

if (!is_dir($targetDir)) {
    mkdir($targetDir, 0755, true);
}

$apiUrl = "https://api.github.com/repos/{$owner}/{$repo}/contents/{$path}";

$context = stream_context_create([
    'http' => [
        'method' => 'GET',
        'header' => [
            'User-Agent: PHP Script',
            'Accept: application/vnd.github.v3+json'
        ]
    ]
]);

echo "Fetching icon list from GitHub API...\n";
$response = file_get_contents($apiUrl, false, $context);

if ($response === false) {
    die("Failed to fetch icon list from GitHub API\n");
}

$files = json_decode($response, true);

if (!is_array($files)) {
    die("Invalid response from GitHub API\n");
}

$svgFiles = array_filter($files, function($file) {
    return isset($file['name']) && str_ends_with($file['name'], '.svg');
});

echo "Found " . count($svgFiles) . " SVG icons\n";

foreach ($svgFiles as $file) {
    $iconName = basename($file['name'], '.svg');
    $downloadUrl = $file['download_url'];

    echo "Downloading {$iconName}...\n";

    $svgContent = file_get_contents($downloadUrl);

    if ($svgContent === false) {
        echo "  Failed to download {$iconName}\n";
        continue;
    }

    $bladeContent = preg_replace(
        '/^(<svg[^>]*)(>)/i',
        '$1 {{ $attributes->merge([\'class\' => \'inline-block\']) }} $2',
        $svgContent,
        1
    );

    $bladeFile = $targetDir . '/' . $iconName . '.blade.php';
    file_put_contents($bladeFile, $bladeContent);

    echo "  Created {$iconName}.blade.php\n";
}

echo "\nDone! Downloaded " . count($svgFiles) . " icons\n";
