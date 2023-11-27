package hu.progmasters.mordor.domain.dto;

import java.util.List;

public class OrcFormModify {

    private String name;

    private String raceType;

    private Long killCount;

    private List<String> weapons;

    public OrcFormModify() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRaceType() {
        return raceType;
    }

    public void setRaceType(String raceType) {
        this.raceType = raceType;
    }

    public Long getKillCount() {
        return killCount;
    }

    public void setKillCount(Long killCount) {
        this.killCount = killCount;
    }

    public List<String> getWeapons() {
        return weapons;
    }

    public void setWeapons(List<String> weapons) {
        this.weapons = weapons;
    }
}
