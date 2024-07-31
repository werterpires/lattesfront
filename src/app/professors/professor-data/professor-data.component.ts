import { Component, Input, OnInit } from '@angular/core'
import { ICurriculum, ITag } from '../../shared/services/types'
import { NgFor, NgIf, NgStyle } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TagsService } from 'src/app/shared/services/tags.service'
import { ProfessorDataService } from './professor-data.service'
import { IUpdateProfessor } from './types'
import { UtilsService } from 'src/app/shared/services/util.service'
import { AlertsService } from 'src/app/shared/alerts/alerts.service'

@Component({
  selector: 'app-professor-data',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, NgStyle],
  templateUrl: './professor-data.component.html',
  styleUrl: './professor-data.component.css'
})
export class ProfessorDataComponent implements OnInit {
  @Input() Curriculums: ICurriculum[] = []

  allTags: ITag[] = []
  filteredTags: ITag[] = []
  addTagOpen = false

  searchText = ''
  constructor(
    public tagService: TagsService,
    private readonly professorDataService: ProfessorDataService,
    public utilService: UtilsService,
    private readonly alertsService: AlertsService
  ) {
    tagService.tags$.subscribe((tags) => {
      this.allTags = tags
      this.filterTags()
    })
  }

  ngOnInit(): void {
    this.Curriculums[0].tags.forEach((tag) => {
      tag.back = this.tagService.turnAnyNameIntoHexadecimal(tag, 'back')
      tag.color = this.tagService.turnAnyNameIntoHexadecimal(tag, 'color')
    })

    this.filterTags()
  }

  filterTags(): void {
    if (this.Curriculums.length === 0) return

    this.filteredTags = this.allTags.filter((tag) => {
      return (
        tag.tagName.toLowerCase().includes(this.searchText.toLowerCase()) &&
        !this.Curriculums[0].tags.some((cTag) => cTag.tagName === tag.tagName)
      )
    })
  }

  selectTag(tag: ITag): void {
    this.Curriculums[0].tags.push(tag)
    this.filterTags()
    this.addTagOpen = false
  }

  unselectTag(tag: ITag): void {
    this.Curriculums[0].tags = this.Curriculums[0].tags.filter(
      (t) => t.tagName !== tag.tagName
    )
    this.filterTags()
  }

  updateProfessor(): void {
    const realServiceYears: string[] = this.utilService.getYears(
      this.Curriculums[0].serviceYears
    )

    const updateProfessor: IUpdateProfessor = {
      serviceYears: realServiceYears,
      active: this.Curriculums[0].active,
      tagsIds: this.Curriculums[0].tags.map((tag) => tag._id),
      lattesId: this.Curriculums[0].lattesId
    }
    this.professorDataService.updateProfessor(updateProfessor).subscribe({
      next: (data) => {
        this.searchText = ''
        this.alertsService.showAlerts('success', 'Professor atualizado', [
          'O currículo foi atualizado com sucesso.'
        ])
      },
      error: (error) => {
        console.log(error)
        this.alertsService.showAlerts('error', 'Erro ao atualizar professor', [
          'Não foi possível atualizar esse professor.'
        ])
      }
    })
  }

  atualizeActive(bool: string): void {
    this.Curriculums[0].active = bool === 'true'
  }

  createTag(): void {
    this.tagService.createTag(this.searchText).subscribe({
      next: (data) => {
        data.back = this.tagService.turnAnyNameIntoHexadecimal(data, 'back')
        data.color = this.tagService.turnAnyNameIntoHexadecimal(data, 'color')
        this.tagService.addTags([data])
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
