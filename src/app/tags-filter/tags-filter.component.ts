import { Component, EventEmitter, Output } from '@angular/core'
import { TagsService } from '../shared/services/tags.service'
import { ITag } from '../shared/services/types'
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ITagFilter } from './types'

@Component({
  selector: 'app-tags-filter',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule, [NgStyle]],
  templateUrl: './tags-filter.component.html',
  styleUrl: './tags-filter.component.css'
})
export class TagsFilterComponent {
  @Output() tagFilterEmmiter = new EventEmitter<ITagFilter>()

  tags: ITag[] = []
  filteredTags: ITag[] = []
  selectedTags: ITag[] = []
  disjunctive: boolean = true

  open: boolean = false

  searchText: string = ''
  constructor(private readonly tagsService: TagsService) {
    this.tagsService.tags$.subscribe((tags) => {
      this.tags = tags
      this.filterTags()
    })
  }

  filterTags(): void {
    this.filteredTags = this.tags.filter((tag) => {
      return !this.selectedTags.includes(tag)
    })

    this.filteredTags = this.filteredTags.filter((tag) =>
      tag.tagName.toLowerCase().includes(this.searchText.toLowerCase())
    )
  }

  selectTag(tag: ITag): void {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter((t) => t !== tag)
    } else {
      this.selectedTags.push(tag)
      this.selectedTags.sort((a, b) => a.tagName.localeCompare(b.tagName))

      this.searchText = ''
    }
    this.filterTags()

    this.emitTagFilter(this.disjunctive)
  }

  emitTagFilter(disjuntctive: boolean): void {
    this.disjunctive = disjuntctive

    this.tagFilterEmmiter.emit({
      tagNames: this.selectedTags.map((tag) => tag.tagName),
      disjunctive: this.disjunctive
    })
  }
}
