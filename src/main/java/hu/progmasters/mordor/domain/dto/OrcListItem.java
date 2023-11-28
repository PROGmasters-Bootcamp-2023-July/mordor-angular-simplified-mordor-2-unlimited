package hu.progmasters.mordor.domain.dto;

import hu.progmasters.mordor.domain.Orc;
import hu.progmasters.mordor.domain.WeaponType;

import java.util.List;
import java.util.stream.Collectors;

public class OrcListItem {

    private Long id;

    private String name;

    private String raceType;

    private Long killCount;

    private List<String> weapons;

    public OrcListItem() {
    }

    public OrcListItem(Orc orc) {
        this.id = orc.getId();
        this.name = orc.getName();
        this.raceType = orc.getOrcRaceType().name();
        this.killCount = orc.getKillCount();
        this.weapons = orc.getWeapons().stream().map(WeaponType::name).collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
