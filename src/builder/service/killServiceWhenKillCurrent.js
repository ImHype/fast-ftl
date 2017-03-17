export default function killServiceWhenKillCurrent(service) {
    const exitProcess = () => {
        try {
            service.kill('SIGHUP');
            process.exit(0);
        } catch (e) {}
    };
    process.on('SIGINT', exitProcess);
    process.on('exit', exitProcess);
    process.on('uncaughtException', exitProcess);
}
