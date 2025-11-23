<?php

namespace SpireUI\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Cache;

class IconController extends Controller
{
    /**
     * Curated list of commonly used Lucide icons.
     *
     * @var array<int, string>
     */
    protected array $curatedIcons = [
        'activity', 'airplay', 'alert-circle', 'alert-triangle', 'archive',
        'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up', 'at-sign',
        'award', 'bar-chart', 'bell', 'bold', 'bookmark',
        'box', 'briefcase', 'calendar', 'camera', 'check',
        'check-circle', 'chevron-down', 'chevron-left', 'chevron-right', 'chevron-up',
        'circle', 'clipboard', 'clock', 'cloud', 'code',
        'copy', 'credit-card', 'database', 'download', 'edit',
        'eye', 'eye-off', 'file', 'file-text', 'filter',
        'flag', 'folder', 'gift', 'globe', 'grid',
        'hash', 'heart', 'help-circle', 'home', 'image',
        'inbox', 'info', 'italic', 'layers', 'layout',
        'link', 'list', 'lock', 'log-in', 'log-out',
        'mail', 'map', 'map-pin', 'maximize', 'menu',
        'message-circle', 'message-square', 'mic', 'minimize', 'minus',
        'monitor', 'moon', 'more-horizontal', 'more-vertical', 'move',
        'music', 'package', 'paperclip', 'pause', 'pen',
        'phone', 'pie-chart', 'play', 'plus', 'plus-circle',
        'power', 'printer', 'refresh-cw', 'repeat', 'save',
        'search', 'send', 'settings', 'share', 'shield',
        'shopping-bag', 'shopping-cart', 'sliders', 'smartphone', 'smile',
        'star', 'sun', 'tag', 'target', 'terminal',
        'thumbs-down', 'thumbs-up', 'trash', 'trash-2', 'trending-up',
        'truck', 'underline', 'unlock', 'upload', 'user',
        'user-plus', 'users', 'video', 'volume-2', 'wifi',
        'x', 'x-circle', 'zap', 'zoom-in', 'zoom-out',
    ];

    public function __invoke(): JsonResponse
    {
        $prefix = config('spire-ui.prefix', 'spire');

        $icons = Cache::rememberForever('spire-ui.icons', function () use ($prefix) {
            $result = [];

            foreach ($this->curatedIcons as $iconName) {
                $result[$iconName] = trim(
                    Blade::render('<x-' . $prefix . '::icon name="' . $iconName . '" class="w-5 h-5" />')
                );
            }

            return $result;
        });

        return response()->json($icons, 200, [
            'Cache-Control' => 'public, max-age=31536000, immutable',
        ]);
    }
}
