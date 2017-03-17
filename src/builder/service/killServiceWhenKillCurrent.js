export default function killServiceWhenKillCurrent(service) {
    const whenKillCurrent = () => {
        try {
            service.kill('SIGHUP');
        } catch (e) {}
    };

    process.on('SIGINT', whenKillCurrent);
    process.on('exit', whenKillCurrent);

}
