<?php

namespace SpireUI\Traits;

trait WithSpirePagination
{
    public function paginationView()
    {
        $prefix = config('spire-ui.prefix', 'spire');

        return "{$prefix}::components.pagination.default";
    }

    public function paginationSimpleView()
    {
        $prefix = config('spire-ui.prefix', 'spire');

        return "{$prefix}::components.pagination.simple";
    }
}
