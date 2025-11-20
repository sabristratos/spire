<?php

namespace SpireUI\Console;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use RuntimeException;

class InstallCommand extends Command
{
    protected $signature = 'spire:install
                            {--skip-npm : Skip npm dependency installation}
                            {--skip-build : Skip asset building}
                            {--no-interaction : Skip all prompts}';

    protected $description = 'Install Spire UI assets and dependencies';

    public function handle(): int
    {
        $this->components->info('Installing Spire UI...');
        $this->newLine();

        // Publish config (optional)
        if ($this->option('no-interaction') || $this->confirm('Publish configuration file?', false)) {
            $this->components->task('Publishing configuration', function () {
                $this->call('vendor:publish', ['--tag' => 'spire-ui-config', '--force' => false]);
            });
        }

        // Install JavaScript dependencies
        if (!$this->option('skip-npm')) {
            $packageManager = $this->detectPackageManager();
            $this->components->info("Detected package manager: {$packageManager}");
            $this->newLine();

            $this->components->task('Installing JavaScript dependencies', function () use ($packageManager) {
                $installCommand = match($packageManager) {
                    'pnpm' => 'pnpm install',
                    'yarn' => 'yarn install',
                    default => 'npm install',
                };

                $this->executeShellCommand($installCommand);
            });

            // Build assets
            if (!$this->option('skip-build')) {
                $this->components->task('Building assets', function () use ($packageManager) {
                    $buildCommand = match($packageManager) {
                        'pnpm' => 'pnpm run build',
                        'yarn' => 'yarn run build',
                        default => 'npm run build',
                    };

                    $this->executeShellCommand($buildCommand);
                });
            }
        }

        $this->newLine();
        $this->components->info('Spire UI installed successfully!');
        $this->newLine();

        // Provide next steps
        $this->displayNextSteps();

        return Command::SUCCESS;
    }

    protected function detectPackageManager(): string
    {
        if (file_exists(base_path('pnpm-lock.yaml'))) {
            return 'pnpm';
        }

        if (file_exists(base_path('yarn.lock'))) {
            return 'yarn';
        }

        return 'npm';
    }

    protected function executeShellCommand(string $command): void
    {
        $process = Process::fromShellCommandline(
            $command,
            base_path(),
            null,
            null,
            null
        );

        if ('\\' !== DIRECTORY_SEPARATOR && file_exists('/dev/tty') && is_readable('/dev/tty')) {
            try {
                $process->setTty(true);
            } catch (RuntimeException $e) {
                $this->components->warn($e->getMessage());
            }
        }

        $process->run(function ($type, $line) {
            $this->output->write('    ' . $line);
        });

        if (!$process->isSuccessful()) {
            throw new RuntimeException("Command failed: {$command}");
        }
    }

    protected function displayNextSteps(): void
    {
        $this->components->twoColumnDetail(
            '<fg=green>Next Steps</>',
            ''
        );

        $this->newLine();

        $this->line('  <fg=cyan>1.</> Add CSS import to <fg=yellow>resources/css/app.css</>:');
        $this->line('     <fg=gray>@import "tailwindcss";</>');
        $this->line('     <fg=gray>@import "../../vendor/stratos/spire-ui/resources/css/index.css";</>');
        $this->newLine();

        $this->line('  <fg=cyan>2.</> Add JavaScript import to <fg=yellow>resources/js/app.js</>:');
        $this->line('     <fg=gray>import { initializeSpireUI } from "../../vendor/stratos/spire-ui/resources/js/index";</>');
        $this->line('     <fg=gray>initializeSpireUI();</>');
        $this->newLine();

        $this->line('  <fg=cyan>3.</> Include assets in your Blade layout:');
        $this->line('     <fg=gray>@vite(["resources/css/app.css", "resources/js/app.js"])</>');
        $this->newLine();

        $this->line('  <fg=cyan>4.</> Start using components:');
        $this->line('     <fg=gray><x-spire::button color="primary">Click me</x-spire::button></>');
        $this->newLine();

        $this->components->info('Documentation: https://sabristratos.github.io/spire/');
    }
}
